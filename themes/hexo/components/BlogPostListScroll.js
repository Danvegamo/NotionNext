import BLOG from '@/blog.config'
import BlogPostCard from './BlogPostCard'
import BlogPostListEmpty from './BlogPostListEmpty'
import { useGlobal } from '@/lib/global'
import throttle from 'lodash.throttle'
import React from 'react'
import CONFIG_HEXO from '../config_hexo'
import { getListByPage } from '@/lib/utils'

/**
 * Blog list scrolling pagination
 * @param posts all posts
 * @param tags all tags
 * @returns {JSX.Element}
 * @constructor
 */
const BlogPostListScroll = ({ posts = [], currentSearch, showSummary = CONFIG_HEXO.POST_LIST_SUMMARY }) => {
  const postsPerPage = BLOG.POSTS_PER_PAGE
  const [page, updatePage] = React.useState(1)
  const postsToShow = getListByPage(posts, page, postsPerPage)

  let hasMore = false
  if (posts) {
    const totalCount = posts.length
    hasMore = page * postsPerPage < totalCount
  }

  const handleGetMore = () => {
    if (!hasMore) return
    updatePage(page + 1)
  }

  // Monitor scrolling automatic pagination loading
  const scrollTrigger = React.useCallback(throttle(() => {
    const scrollS = window.scrollY + window.outerHeight
    const clientHeight = targetRef ? (targetRef.current ? (targetRef.current.clientHeight) : 0) : 0
    if (scrollS > clientHeight + 100) {
      handleGetMore()
    }
  }, 500))

  // Listen for scrolling
  React.useEffect(() => {
    window.addEventListener('scroll', scrollTrigger)
    return () => {
      window.removeEventListener('scroll', scrollTrigger)
    }
  })

  const targetRef = React.useRef(null)
  const { locale } = useGlobal()

  if (!postsToShow || postsToShow.length === 0) {
    return <BlogPostListEmpty currentSearch={currentSearch} />
  } else {
    return <div id='container' ref={targetRef} className='w-full'>

      {/* Article List */}
      <div className='flex flex-wrap space-y-1 lg:space-y-4 px-2'>
        {postsToShow.map(post => (
          <BlogPostCard key={post.id} post={post} showSummary={showSummary}/>
        ))}
      </div>

      <div>
        <div onClick={() => { handleGetMore() }}
             className='w-full my-4 py-4 text-center cursor-pointer rounded-xl dark:text-gray-200'
        > {hasMore ? locale.COMMON.MORE : `${locale.COMMON.NO_MORE}`} </div>
      </div>
    </div>
  }
}

export default BlogPostListScroll
