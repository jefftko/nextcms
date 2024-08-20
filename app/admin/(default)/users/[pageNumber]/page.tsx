import { SelectedItemsProvider } from '@/app/admin/selected-items-context'
import usersData from '@/data/users/index.json' // 假设数据位于此处
import UsersTable from '../users-table'
import PageHeader from '../page-header'
import React from 'react'

const POSTS_PER_PAGE = 10


export default async function UsersPage({ params }) {

   // 从 URL 参数中获取页码
  const pageNumber = parseInt(params.pageNumber || '1', 10) 
  const totalUsers = usersData.length // 用户总数
  const start = (pageNumber - 1) * POSTS_PER_PAGE // 计算开始位置
  const end = start + POSTS_PER_PAGE // 计算结束位置
  const currentUsers = usersData.slice(start, end) // 当前页的用户

  return (
    <SelectedItemsProvider>
      <div className="mx-auto w-full max-w-[96rem] px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader />
        <UsersTable users={currentUsers} total={totalUsers} pageNumber={pageNumber} />
      </div>
    </SelectedItemsProvider>
  )
}
