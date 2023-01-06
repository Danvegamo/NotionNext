import BlogPostCard from './BlogPostCard'
import PaginationNumber from './PaginationNumber'
import BLOG from '@/blog.config'
import BlogPostListEmpty from './BlogPostListEmpty'

/**
 * Article List Paging Form
 * @param page Current page
 * @param posts All posts
 * @param tags All tags
 * @returns {JSX.Element}
 * @constructor
 */
const BlogPostListPage = ({ page = 1, posts = [], postCount }) => {
  const totalPage = Math.ceil(postCount / BLOG.POSTS_PER_PAGE)
  const showPagination = postCount >= BLOG.POSTS_PER_PAGE
  if (!posts || posts.length === 0 || page > totalPage) {
    return <BlogPostListEmpty />
  } else {
    return (
      <div id="container" className='w-full'>
        {/* Article List */}
        <div className="space-y-6 px-2">
          {posts.map(post => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
        {showPagination && <PaginationNumber page={page} totalPage={totalPage} />}
      </div>
    )
  }
}

export default BlogPostListPage
