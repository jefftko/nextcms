import { SelectedItemsProvider } from '@/app/admin/selected-items-context'
import usersData from '@/data/users/index.json' // 假设数据位于此处
import UsersTable from './users-table'
import { auth } from 'auth'
import { redirect } from 'next/navigation'
import React from 'react'

const POSTS_PER_PAGE = 10

export default async function UsersPage({ searchParams }) {
  const session = await auth()
  if (!session) {
    redirect('/admin/signin')
  }

  const pageNumber = parseInt(searchParams.page || '1', 10) // 当前页码
  const totalUsers = usersData.length // 用户总数
  const start = (pageNumber - 1) * POSTS_PER_PAGE // 计算开始位置
  const end = start + POSTS_PER_PAGE // 计算结束位置
  const currentUsers = usersData.slice(start, end) // 当前页的用户

  return (
    <SelectedItemsProvider>
      <div className="mx-auto w-full max-w-[96rem] px-4 py-8 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-8 sm:flex sm:items-center sm:justify-between">
          {/* Left: Title */}
          <div className="mb-4 sm:mb-0">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 md:text-3xl">
              Users 🌟
            </h1>
          </div>

          {/* Right: Actions */}
          <div className="grid grid-flow-col justify-start gap-2 sm:auto-cols-max sm:justify-end">
            {/* Add user button */}
            <button className="btn bg-indigo-500 text-white hover:bg-indigo-600">
              <svg className="h-4 w-4 shrink-0 fill-current opacity-50" viewBox="0 0 16 16">
                <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
              </svg>
              <span className="ml-2">Add User</span>
            </button>
          </div>
        </div>

        <UsersTable users={currentUsers} total={totalUsers} pageNumber={pageNumber} />
      </div>
    </SelectedItemsProvider>
  )
}
