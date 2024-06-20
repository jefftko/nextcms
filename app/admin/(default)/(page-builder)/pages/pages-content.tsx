'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { StaticImageData } from 'next/image'
import { useItemSelection } from '@/components/utils/use-item-selection'
import DeleteButton from '@/components/admin/delete-button'
import DateSelect from '@/components/admin/date-select'
import FilterButton from '@/components/admin/dropdown-filter'
import PagesTable from './pages-table'
import PaginationClassic from '@/components/admin/pagination-classic'
import type { Pages } from 'contentlayer/generated'
import { CoreContent } from 'pliny/utils/contentlayer'
import LoadingSpinner from '@/components/admin/loading-spinner'
import { useAppProvider } from '@/app/admin/app-provider'
const POSTS_PER_PAGE = 10

interface ListLayoutProps {
  posts: Pages[]
  title: string
  pageNumber?: number
}

export default function PagesContent({ posts, title, pageNumber = 1 }: ListLayoutProps) {
  const [searchValue, setSearchValue] = useState('')
  const [isCopyModalOpen, setIsCopyModalOpen] = useState(false)
  const { loading, setLoading } = useAppProvider()
  const filteredPosts = posts.filter((post) => {
    const searchContent = post.title
    return searchContent?.toLowerCase().includes(searchValue.toLowerCase())
  })
  const initialDisplayPosts = filteredPosts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber || 1,
    total: filteredPosts.length,
    perPage: POSTS_PER_PAGE,
    //totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  const router = useRouter()

  return (
    <div className="mx-auto w-full max-w-[96rem] px-4 py-8 sm:px-6 lg:px-8">
      {loading && <LoadingSpinner />}
      {/* Page header */}
      <div className="mb-8 sm:flex sm:items-center sm:justify-between">
        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 md:text-3xl">
            Pages 🌟
          </h1>
        </div>

        {/* Right: Actions */}
        <div className="grid grid-flow-col justify-start gap-2 sm:auto-cols-max sm:justify-end">
          {/* Add order button */}
          <button
            className="btn bg-indigo-500 text-white hover:bg-indigo-600"
            onClick={() => router.push('/admin/pages/create')}
          >
            <svg className="h-4 w-4 shrink-0 fill-current opacity-50" viewBox="0 0 16 16">
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="ml-2">Add Page</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <PagesTable pages={initialDisplayPosts} total={posts.length} />

      {/* Pagination */}
      <div className="mt-8">
        <PaginationClassic {...pagination} />
      </div>
    </div>
  )
}
