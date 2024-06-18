'use client'
import Image from 'next/image'
//import { OrdersProperties } from './orders-properties'

import type { Pages } from 'contentlayer/generated'
import { formatDate } from 'pliny/utils/formatDate'
import { useRouter } from 'next/navigation'
import { Icon } from '@/components/icons'
import { useState } from 'react'

interface PagesTableItemProps {
  page: Pages
  onCheckboxChange: (id: number, checked: boolean) => void
  isSelected: boolean
  handleCopy: () => void
  handleDelete: () => void
  handleDefault: () => void
}

const statusColor = (status: string): string => {
  switch (status) {
    case 'published':
      return 'bg-emerald-100 dark:bg-emerald-400/30 text-emerald-600 dark:text-emerald-400'
    case 'unpublished':
      return 'bg-rose-100 dark:bg-rose-500/30 text-rose-500 dark:text-rose-400'
    default:
      return 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
  }
}

export default function PagesTableItem({
  page,
  onCheckboxChange,
  isSelected,
  handleCopy,
  handleDelete,
  handleDefault,
}: PagesTableItemProps) {
  const router = useRouter()
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //onCheckboxChange(order.id, e.target.checked)
  }

  const handlePageDefault = (isDefault) => {
    if (!isDefault) {
      handleDefault()
    }
    return
  }

  return (
    <tbody className="text-sm">
      {/* Row */}
      <tr>
        <td className="whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
          <div>{page.title}</div>
        </td>
        <td className="whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
          <div>{page.pagePath}</div>
        </td>
        <td className="whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
          <div>{page.layout || 'default'}</div>
        </td>
        <td className="whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
          <div className="relative flex items-center">
            <button onClick={() => handlePageDefault(page.isDefault)}>
              <svg
                className={`h-6 w-6 shrink-0 fill-current ${page.isDefault ? 'text-amber-500' : 'text-slate-300 dark:text-slate-600'}`}
                viewBox="0 0 16 16"
              >
                <path d="M8 0L6 5.934H0l4.89 3.954L2.968 16 8 12.223 13.032 16 11.11 9.888 16 5.934h-6L8 0z" />
              </svg>
            </button>
          </div>
        </td>
        <td className="whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
          <div
            className={`inline-flex rounded-full px-2.5 py-0.5 text-center font-medium ${statusColor(page.status)}`}
          >
            {page.status}
          </div>
        </td>
        <td className="whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
          {page.date ? formatDate(page.date) : '—'}
        </td>
        <td className="whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
          {page.lastmod ? formatDate(page?.lastmod) : '—'}
        </td>
        <td className="w-px whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
          <div className="space-x-1">
            <button
              className="rounded-full text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400"
              onClick={() => router.push(`/admin/pages/edit/${page.pagePath}`)}
            >
              <span className="sr-only">Edit</span>
              <Icon kind="edit" size={6} />
            </button>
            <button
              className="rounded-full text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400"
              onClick={handleCopy}
            >
              <span className="sr-only">Copy</span>
              <Icon kind="copy" size={6} />
            </button>
            <button
              className="rounded-full text-rose-500 hover:text-rose-600"
              onClick={handleDelete}
            >
              <span className="sr-only">Delete</span>
              <Icon kind="trash" size={6} />
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  )
}
