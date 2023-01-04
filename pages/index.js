import BLOG from '@/blog.config'
import { getPostBlocks } from '@/lib/notion'
import { getGlobalNotionData } from '@/lib/notion/getNotionData'
import * as ThemeMap from '@/themes'
import { useGlobal } from '@/lib/global'
const Index = props => {
  const { theme } = useGlobal()
  const ThemeComponents = ThemeMap[theme]
  return <ThemeComponents.LayoutIndex {...props} />
}

export async function getStaticProps() {
  const from = 'index'
  const props = await getGlobalNotionData({ from })
  const { siteInfo } = props
  props.posts = props.allPages.filter(page => page.type === 'Post' && page.status === 'Published')
  const meta = {
    title: `${siteInfo?.title} | ${siteInfo?.description}`,
    description: siteInfo?.description,
    image: siteInfo?.pageCover,
    slug: '',
    type: 'website'
  }
  // 处理分页
  if (BLOG.POST_LIST_STYLE === 'scroll') {
    // Scrolling lists return all data to the front-end by default
  } else if (BLOG.POST_LIST_STYLE === 'page') {
    props.posts = props.posts?.slice(0, BLOG.POSTS_PER_PAGE)
  }

  // Preview article content
  if (BLOG.POST_LIST_PREVIEW === 'true') {
    for (const i in props.posts) {
      const post = props.posts[i]
      if (post.password && post.password !== '') {
        continue
      }
      post.blockMap = await getPostBlocks(post.id, 'slug', BLOG.POST_PREVIEW_LINES)
    }
  }

  return {
    props: {
      meta,
      ...props
    },
    revalidate: BLOG.NEXT_REVALIDATE_SECOND
  }
}

export default Index
