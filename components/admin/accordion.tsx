'use client'

import { useState } from 'react'
import { Icon } from '@/components/icons'

export default function Accordion({
  children,
  title,
  className = '',
  isEditing = false,
  onItemClick,
}: {
  children: React.ReactNode
  title: string
  className?: string
  isEditing?: boolean
  onItemClick?: (isEditing: boolean) => void
}) {
  return (
    <div
      className={`rounded-sm border border-slate-200 px-3 py-2 dark:border-slate-700 dark:bg-slate-800 ${className}`}
    >
      <button
        className="group mb-1 flex w-full items-center justify-between"
        aria-expanded={isEditing}
        onClick={() => {
          onItemClick && onItemClick(!isEditing)
        }}
      >
        <div className="text-sm font-medium text-slate-800 dark:text-slate-100">{title}</div>
        <svg
          className={`ml-3 h-8 w-8 shrink-0 fill-current text-slate-400 group-hover:text-slate-500 dark:text-slate-500 dark:group-hover:text-slate-400 ${isEditing && 'rotate-180'}`}
          viewBox="0 0 32 32"
        >
          <path d="M16 20l-5.4-5.4 1.4-1.4 4 4 4-4 1.4 1.4z" />
        </svg>
      </button>
      <div className={`text-sm ${!isEditing && 'hidden'}`}>{children}</div>
    </div>
  )
}
