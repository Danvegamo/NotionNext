import BlogPostListScroll from './components/BlogPostListScroll'
import BlogPostListPage from './components/BlogPostListPage'
import LayoutBase from './LayoutBase'
import BLOG from '@/blog.config'

export const LayoutCategory = props => {
  const { category } = props
  return <LayoutBase {...props}>
        <div className="cursor-pointer text-lg px-5 py-1 mb-2 font-light hover:text-yellow-700 dark:hover:text-yellow-400 transform dark:text-black">
            <i className="mr-1 far fa-folder-open" />
            {category}
        </div>
        {BLOG.POST_LIST_STYLE === 'page' ? <BlogPostListPage {...props} /> : <BlogPostListScroll {...props} />}
    </LayoutBase>
}
