'use client'
import { formatDate } from 'pliny/utils/formatDate'
import { Icon } from '@/components/icons'
import type { Content } from 'contentlayer/generated'
import { useRouter } from 'next/navigation'

interface ArticlesTableItemProps {
  article: Content
  handleDelete: () => void
}

const statusColor = (status: string): string => {
  switch (status) {
    case 'published':
      return 'bg-emerald-100 dark:bg-emerald-400/30 text-emerald-600 dark:text-emerald-400'
    case 'draft':
      return 'bg-amber-100 dark:bg-amber-400/30 text-amber-600 dark:text-amber-400'
    default:
      return 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
  }
}

export default function ArticlesTableItem({ article, handleDelete }: ArticlesTableItemProps) {
  const router = useRouter()

  return (
    <tr>
      <td className="whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
        <div className="font-medium text-slate-800 dark:text-slate-100">{article.title}</div>
      </td>
      <td className="whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
        <div className="text-left">{article.slug}</div>
      </td>
      <td className="whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
        <div
          className={`inline-flex rounded-full px-2.5 py-0.5 text-center font-medium ${statusColor(article.draft ? 'draft' : 'published')}`}
        >
          {article.draft ? 'Draft' : 'Published'}
        </div>
      </td>
      <td className="whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
        <div>{article.date ? formatDate(article.date) : '—'}</div>
      </td>
      <td className="whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
        <div>{article.lastmod ? formatDate(article.lastmod) : '—'}</div>
      </td>
      <td className="w-px whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
        <div className="space-x-1">
          <button
            className="rounded-full text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400"
            onClick={() => router.push(`/admin/content/edit/${article.slug}`)}
          >
            <span className="sr-only">Edit</span>
            <Icon kind="edit" size={6} />
          </button>

          <button className="rounded-full text-rose-500 hover:text-rose-600" onClick={handleDelete}>
            <span className="sr-only">Delete</span>
            <Icon kind="trash" size={6} />
          </button>
        </div>
      </td>
    </tr>
  )
}
