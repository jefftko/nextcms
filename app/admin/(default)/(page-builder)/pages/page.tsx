import { SelectedItemsProvider } from '@/app/admin/selected-items-context'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allPages } from 'contentlayer/generated'
import PagesContent from './pages-content'
import type { Pages } from 'contentlayer/generated'
import { auth } from 'auth'
import { redirect } from 'next/navigation'
import React, { Suspense } from 'react'
/*export const metadata = {
  title: 'Pages',
  description: 'Page description',
}*/

export default async function Pages() {
  const session = await auth()
  if (!session) {
    redirect('/admin/signin')
  }
  //@ts-ignore - Disable TypeScript check for the next line
  const posts = allCoreContent(sortPosts(allPages)) as Pages[]
  const pageNumber = 1

  return (
    <SelectedItemsProvider>
      <PagesContent posts={posts} pageNumber={pageNumber} title="Pages" />
    </SelectedItemsProvider>
  )
}
