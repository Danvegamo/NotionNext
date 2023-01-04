import BLOG from '@/blog.config'
import { getDataFromCache, setDataToCache } from '@/lib/cache/cache_manager'
import { getPostBlocks } from '@/lib/notion/getPostBlocks'
import { idToUuid } from 'notion-utils'
import { defaultMapImageUrl } from 'react-notion-x'
import { deepClone } from '../utils'
import { getAllCategories } from './getAllCategories'
import getAllPageIds from './getAllPageIds'
import { getAllTags } from './getAllTags'
import getPageProperties from './getPageProperties'

/**
 * Get blog data
 * @param {*} pageId
 * @param {*} from
 * @param latestPostCount Intercept the number of latest posts
 * @param categoryCount
 * @param tagsCount Intercept the number of tags
 * @param pageType Filtered article type, array format ['Page','Post']
 * @returns
 *
 */
export async function getGlobalNotionData({
  pageId = BLOG.NOTION_PAGE_ID,
  from
}) {
  // Get Notion Data
  const notionPageData = deepClone(await getNotionPageData({ pageId, from }))
  delete notionPageData.block
  delete notionPageData.collection
  delete notionPageData.collectionQuery
  delete notionPageData.schema
  delete notionPageData.rawMetadata
  delete notionPageData.pageIds
  return notionPageData
}

/**
 * Get the latest articles in reverse chronological order of last modified
 * @param {*}} param0
 * @returns
 */
function getLatestPosts({ allPages, from, latestPostCount }) {
  const allPosts = allPages.filter(page => page.type === 'Post' && page.status === 'Published')

  const latestPosts = Object.create(allPosts).sort((a, b) => {
    const dateA = new Date(a?.lastEditedTime || a?.createdTime || a?.date?.start_date)
    const dateB = new Date(b?.lastEditedTime || b?.createdTime || b?.date?.start_date)
    return dateB - dateA
  })
  return latestPosts.slice(0, latestPostCount)
}

/**
 * Get the collection data of the specified notion
 * @param pageId
 * @param from Request source
 * @returns {Promise<JSX.Element|*|*[]>}
 */
export async function getNotionPageData({ pageId, from }) {
  // Try to fetch from cache
  const cacheKey = 'page_block_' + pageId
  const data = await getDataFromCache(cacheKey)
  if (data && data.pageIds?.length > 0) {
    console.log('[命中缓存]:', `from:${from}`, `root-page-id:${pageId}`)
    return data
  }
  const pageRecordMap = await getPageRecordMapByNotionAPI({ pageId, from })
  // Store in cache
  if (pageRecordMap) {
    await setDataToCache(cacheKey, pageRecordMap)
  }
  return pageRecordMap
}

/**
 * Get user-defined page data menu
 * @param notionPageData
 * @returns {Promise<[]|*[]>}
 */
function getCustomNav({ allPages }) {
  const customNav = []
  if (allPages && allPages.length > 0) {
    allPages.forEach(p => {
      if (p?.status === 'Published' && p?.type === 'Page') {
        if (p?.slug?.indexOf('http') === 0) {
          customNav.push({ icon: p.icon || null, name: p.title, to: p.slug, show: true })
        } else {
          customNav.push({ icon: p.icon || null, name: p.title, to: '/' + p.slug, show: true })
        }
      }
    })
  }
  return customNav
}

/**
 * Get label options
 * @param schema
 * @returns {undefined}
 */
function getTagOptions(schema) {
  if (!schema) return {}
  const tagSchema = Object.values(schema).find(e => e.name === BLOG.NOTION_PROPERTY_NAME.tags)
  return tagSchema?.options || []
}

/**
 * 获取分类选项
 * @param schema
 * @returns {{}|*|*[]}
 */
function getCategoryOptions(schema) {
  if (!schema) return {}
  const categorySchema = Object.values(schema).find(e => e.name === BLOG.NOTION_PROPERTY_NAME.category)
  return categorySchema?.options || []
}

/**
 * 站点信息
 * @param notionPageData
 * @param from
 * @returns {Promise<{title,description,pageCover,icon}>}
 */
function getBlogInfo({ collection, block }) {
  const title = collection?.name?.[0][0] || BLOG.TITLE
  const description = collection?.description ? Object.assign(collection).description[0][0] : BLOG.DESCRIPTION
  const pageCover = collection?.cover ? (mapImgUrl(collection?.cover, block[idToUuid(BLOG.NOTION_PAGE_ID)]?.value)) : BLOG.HOME_BANNER_IMAGE
  const icon = collection?.icon ? (mapCollectionImg(collection?.icon, collection)) : BLOG.AVATAR
  return { title, description, pageCover, icon }
}

/**
 * Notion图片映射
 * @param pageCover
 * @returns {string}
 */
const mapImgUrl = (img, value) => {
  if (img) {
    if (img.startsWith('/')) return 'https://www.notion.so' + img
    if (img.startsWith('http')) return defaultMapImageUrl(img, value)
  }
}

/**
 * collection 图片映射
 * @param {*} img
 * @param {*} value
 * @returns
 */
const mapCollectionImg = (img, value) => {
  if (img) {
    if (img.startsWith('/')) return 'https://www.notion.so' + img
    if (img.startsWith('http')) {
      return 'https://www.notion.so/image/' + encodeURIComponent(img) + '?table=collection&id=' + value.id
    }
    // 判断是否含有emoji表情
    const emojiPattern = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g
    if (emojiPattern.test(img)) {
      console.error('请不要使用emoji作为站点图标', img)
      return BLOG.AVATAR
    }

    console.error('非法的站点图标', img)
    return BLOG.AVATAR
  }
}

/**
 * 调用NotionAPI获取Page数据
 * @returns {Promise<JSX.Element|null|*>}
 */
async function getPageRecordMapByNotionAPI({ pageId, from }) {
  const pageRecordMap = await getPostBlocks(pageId, from)
  if (!pageRecordMap) {
    return []
  }
  pageId = idToUuid(pageId)
  const block = pageRecordMap.block
  const rawMetadata = block[pageId]?.value
  // Check Type Page-Database和Inline-Database
  if (
    rawMetadata?.type !== 'collection_view_page' &&
        rawMetadata?.type !== 'collection_view'
  ) {
    console.warn(`pageId "${pageId}" is not a database`)
    return null
  }

  const collection = Object.values(pageRecordMap.collection)[0]?.value
  const collectionId = rawMetadata?.collection_id
  const collectionQuery = pageRecordMap.collection_query
  const collectionView = pageRecordMap.collection_view
  const schema = collection?.schema
  const tagOptions = getTagOptions(schema)
  const categoryOptions = getCategoryOptions(schema)
  const viewIds = rawMetadata?.view_ids
  const collectionData = []
  const pageIds = getAllPageIds(collectionQuery, collectionId, collectionView, viewIds)
  const siteInfo = getBlogInfo({ collection, block })
  if (pageIds?.length === 0) {
    console.error('获取到的文章列表为空，请检查notion模板', collectionQuery, collection, collectionView, viewIds, pageRecordMap)
  }
  for (let i = 0; i < pageIds.length; i++) {
    const id = pageIds[i]
    const value = block[id]?.value
    if (!value) {
      continue
    }
    const properties = (await getPageProperties(id, block, schema, null, tagOptions, siteInfo)) || null
    if (properties) {
      collectionData.push(properties)
    }
  }

  // 获取page作为自定义菜单
  const customNav = getCustomNav({ allPages: collectionData.filter(post => post.type === 'Page' && post.status === 'Published') })

  // 文章计数
  let postCount = 0
  const allPages = collectionData.filter(post => {
    if (post.type === 'Post' && post.status === 'Published') {
      postCount++
    }
    return post &&
            post.type &&
            (post.type === 'Post' || post.type === 'Page') &&
            (post.status === 'Published' || post.status === 'Invisible') &&
            (!post.slug.startsWith('http'))
  })

  // Sort by date
  if (BLOG.POSTS_SORT_BY === 'date') {
    allPages.sort((a, b) => {
      const dateA = new Date(a?.date?.start_date || a.createdTime)
      const dateB = new Date(b?.date?.start_date || b.createdTime)
      return dateB - dateA
    })
  }

  const categories = getAllCategories({ allPages, categoryOptions, sliceCount: BLOG.PREVIEW_CATEGORY_COUNT })
  const tags = getAllTags({ allPages, sliceCount: BLOG.PREVIEW_TAG_COUNT, tagOptions })
  const latestPosts = getLatestPosts({ allPages, from, latestPostCount: 5 })

  return {
    siteInfo,
    allPages,
    collection,
    collectionQuery,
    collectionId,
    collectionView,
    viewIds,
    block,
    schema,
    tagOptions,
    categoryOptions,
    rawMetadata,
    customNav,
    postCount,
    pageIds,
    categories,
    tags,
    latestPosts
  }
}
