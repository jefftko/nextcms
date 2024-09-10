import { SelectedItemsProvider } from '@/app/admin/selected-items-context'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allContents } from 'contentlayer/generated'
import type { Content } from 'contentlayer/generated'
import ArticlesContent from './articles-content'
import { auth } from 'auth'
import { redirect } from 'next/navigation'

export default async function Articles({ searchParams }: { searchParams: { page?: string } }) {
  try {
    const session = await auth()
    if (!session) {
      redirect('/admin/signin')
    }

    const pageNumber = parseInt(searchParams.page || '1', 10)
    //@ts-ignore - Disable TypeScript check for the next line
    const articles = allCoreContent(sortPosts(allContents)) as Content[]

    return (
      <SelectedItemsProvider>
        <ArticlesContent articles={articles} pageNumber={pageNumber} title="Articles" />
      </SelectedItemsProvider>
    )
  } catch (error) {
    console.error('Error in Articles page:', error)
    redirect('/admin/error')
  }
}
