'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useItemSelection } from '@/components/utils/use-item-selection'
import ArticlesTable from './articles-table'
import PaginationClassic from '@/components/admin/pagination-classic'
import LoadingSpinner from '@/components/admin/loading-spinner'
import { useAppProvider } from '@/app/admin/app-provider'
import type { Content } from 'contentlayer/generated'
const ARTICLES_PER_PAGE = 10



interface ListLayoutProps {
  articles: Content[]
  title: string
  pageNumber?: number
}

export default function ArticlesContent({ articles, title, pageNumber = 1 }: ListLayoutProps) {
  const [searchValue, setSearchValue] = useState('')
  const { loading, setLoading } = useAppProvider()
  const filteredArticles = articles.filter((article) => {
    const searchContent = article.title
    return searchContent?.toLowerCase().includes(searchValue.toLowerCase())
  })

  const initialDisplayArticles = filteredArticles.slice(
    ARTICLES_PER_PAGE * (pageNumber - 1),
    ARTICLES_PER_PAGE * pageNumber
  )

  const pagination = {
    currentPage: pageNumber,
    pagePathname: 'articles',
    total: filteredArticles.length,
    perPage: ARTICLES_PER_PAGE,
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
            Articles 📝
          </h1>
        </div>

        {/* Right: Actions */}
        <div className="grid grid-flow-col justify-start gap-2 sm:auto-cols-max sm:justify-end">
          {/* Add article button */}
          <button
            className="btn bg-indigo-500 text-white hover:bg-indigo-600"
            onClick={() => router.push('/admin/articles/create')}
          >
            <svg className="h-4 w-4 shrink-0 fill-current opacity-50" viewBox="0 0 16 16">
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1z" />
            </svg>
            <span className="ml-2">Add Article</span>
          </button>
        </div>
      </div>

      {/* Search bar */}
      <div className="mb-4">
        <input
          type="text"
          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          placeholder="Search articles..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      {/* Table */}
      <ArticlesTable articles={initialDisplayArticles} total={articles.length} />

      {/* Pagination */}
      <div className="mt-8">
        <PaginationClassic {...pagination} />
      </div>
    </div>
  )
}
