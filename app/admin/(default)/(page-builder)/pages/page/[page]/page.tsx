import { SelectedItemsProvider } from '@/app/admin/selected-items-context'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allPages } from 'contentlayer/generated'
import type { Pages } from 'contentlayer/generated'
import PagesContent from '../../pages-content'

/*export const generateStaticParams = async () => {
  const totalPages = Math.ceil(allBlogs.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))

  return paths
}*/

export default function Page({ params }: { params: { page: string } }) {
  //@ts-ignore - Disable TypeScript check for the next line
  const posts = allCoreContent(sortPosts(allPages)) as Pages[]
  const pageNumber = parseInt(params.page as string)

  return (
    <SelectedItemsProvider>
      <PagesContent posts={posts} pageNumber={pageNumber} title="Pages" />
    </SelectedItemsProvider>
  )
}
