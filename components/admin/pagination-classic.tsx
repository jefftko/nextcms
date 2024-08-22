'use client'
import { usePathname } from 'next/navigation'

interface PaginationProps {
  currentPage: number
  total: number
  perPage: number
  pagePathname?: string
}

export default function PaginationClassic({
  total,
  currentPage,
  perPage,
  pagePathname,
}: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname?.split('/')[1]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= Math.ceil(total / perPage)

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <nav className="mb-4 sm:order-1 sm:mb-0" role="navigation" aria-label="Navigation">
        <ul className="flex justify-center">
          <li className="ml-3 first:ml-0">
            {!prevPage && (
              <span className="btn border-slate-200 bg-white text-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-600">
                &lt;- Previous
              </span>
            )}

            {prevPage && (
              <a
                className="btn border-slate-200 bg-white text-indigo-500 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600"
                href={`/${basePath}/pages/page/${currentPage - 1}`}
              >
                &lt;- Previous
              </a>
            )}
          </li>
          <li className="ml-3 first:ml-0">
            {!nextPage && (
              <span className="btn border-slate-200 bg-white text-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-600">
                Next -&gt;
              </span>
            )}
            {nextPage && (
              <a
                className="btn border-slate-200 bg-white text-indigo-500 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600"
                href={`/${basePath}/${pagePathname ? pagePathname : 'pages/page'}/${currentPage + 1}`}
              >
                Next -&gt;
              </a>
            )}
          </li>
        </ul>
      </nav>
      <div className="text-center text-sm text-slate-500 dark:text-slate-400 sm:text-left">
        Showing{' '}
        <span className="font-medium text-slate-600 dark:text-slate-300">
          {(currentPage - 1) * perPage + 1}
        </span>{' '}
        to <span className="font-medium text-slate-600 dark:text-slate-300">{perPage}</span> of{' '}
        <span className="font-medium text-slate-600 dark:text-slate-300">{total}</span> results
      </div>
    </div>
  )
}
