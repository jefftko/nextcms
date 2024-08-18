'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Icon } from '@/components/icons'
import fs from 'fs'
import path from 'path'

interface User {
  id: number
  name: string
  email: string
  role: string
  status: string
}

interface UsersTableItemProps {
  user: User
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

const statusColor = (status: string): string => {
  switch (status) {
    case 'active':
      return 'bg-emerald-100 dark:bg-emerald-400/30 text-emerald-600 dark:text-emerald-400'
    case 'inactive':
      return 'bg-rose-100 dark:bg-rose-500/30 text-rose-500 dark:text-rose-400'
    default:
      return 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
  }
}

export default function UsersTableItem({ user, onEdit, onDelete }: UsersTableItemProps) {
  const router = useRouter()

  return (
    <tbody className="text-sm">
      <tr>
        <td className="whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
          <div>{user.name}</div>
        </td>
        <td className="whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
          <div>{user.email}</div>
        </td>
        <td className="whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
          <div>{user.role}</div>
        </td>
        <td className="whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
          <div
            className={`inline-flex rounded-full px-2.5 py-0.5 text-center font-medium ${statusColor(user.status)}`}
          >
            {user.status}
          </div>
        </td>
        <td className="w-px whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
          <div className="space-x-1">
            <button
              className="rounded-full text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400"
              onClick={() => onEdit(user.id)}
            >
              <span className="sr-only">Edit</span>
              <Icon kind="edit" size={6} />
            </button>
            <button
              className="rounded-full text-rose-500 hover:text-rose-600"
              onClick={() => onDelete(user.id)}
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
