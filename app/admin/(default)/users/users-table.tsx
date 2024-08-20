'use client'
import React, { useState } from 'react'
import ModalBlank from '@/components/admin/modal-blank'
import PaginationClassic from '@/components/admin/pagination-classic'
import { useItemSelection } from '@/components/utils/use-item-selection'
import { useMessage } from '@/app/admin/message-provider'
import { useAppProvider } from '@/app/admin/app-provider'
import { Icon } from '@/components/icons'
import { deleteUser, saveUser } from '@/services/userService'
import UserModal from './user-modal'

const tableTitles = ['Name', 'UserName', 'Email', 'Role', 'Status', 'Action']

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

const defaultUser = {
  id: '',
  name: '',
  username: '',
  email: '',
  password: '',
  role: 'admin',
  status: 'active',
}

export default function UsersTable({ users, total, pageNumber }) {
  const { selectedItems, handleCheckboxChange } = useItemSelection(users)
  const { setToast } = useMessage()
  const { setLoading } = useAppProvider()
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  const onDelete = (userId) => {
    setCurrentUser(users.find(user => user.id === userId))
    setDeleteModalOpen(true)
  }

  const handleUserDelete = async () => {
    setLoading(true)
    setDeleteModalOpen(false)
    if (!currentUser) return
    try {
      const res = await deleteUser(currentUser['id'])
      setLoading(false)
      if(res.status === 'success') {
        setToast({ message: 'User deleted successfully', type: 'success' })
      } else {
        setToast({ message: res.message, type: 'error' })
      }
    } catch (error) {
      setLoading(false)
      setToast({ message: error.message, type: 'error' })
    }
  }

  const onEdit = (userId) => {
    setCurrentUser(users.find(user => user.id === userId))
    setEditModalOpen(true)
  }

  const handleUserSave = async (user) => {
    setLoading(true)
    setEditModalOpen(false)
    try {
      const res = await saveUser(user)
      setLoading(false)
      if(res.status === 'success') {
        setToast({ message: 'User saved successfully', type: 'success' })
      } else {
        setToast({ message: res.message, type: 'error' })
      }
    } catch (error) {
      setLoading(false)
      setToast({ message: error.message, type: 'error' })
    }
  }

  // Pagination configuration
  const pagination = {
    currentPage: pageNumber,
    pagePathname: 'users',
    total: total,
    perPage: 10, // 每页显示的用户数
  }

  return (
    <>
      <div className="relative rounded-sm border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800">
        <header className="flex justify-between px-5 py-4">
          <h2 className="font-semibold text-slate-800 dark:text-slate-100">
            All Users{' '}
            <span className="font-medium text-slate-400 dark:text-slate-500">{total}</span>
          </h2>
        </header>
        <div>
          <div className="overflow-x-auto">
            <table className="w-full table-auto divide-y divide-slate-200 dark:divide-slate-700 dark:text-slate-300">
              <thead className="border-t border-slate-200 bg-slate-50 text-xs uppercase text-slate-500 dark:border-slate-700 dark:bg-slate-900/20 dark:text-slate-400">
                <tr>
                  {tableTitles.map((title, index) => (
                    <th key={index} className="whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
                      <div className="text-left font-semibold">{title}</div>
                    </th>
                  ))}
                  <th className="whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
                    <span className="sr-only">Menu</span>
                  </th>
                </tr>
              </thead>

              <tbody className="text-sm">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
                      {user.name}
                    </td>
                    <td className="whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
                      {user.username}
                    </td>
                    <td className="whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
                      {user.email}
                    </td>
                    <td className="whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
                      {user.role}
                    </td>
                    <td className="whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
                      <div
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-center font-medium ${statusColor(
                          user.status
                        )}`}
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
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 删除用户的确认模态框 */}
        <ModalBlank isOpen={deleteModalOpen} setIsOpen={setDeleteModalOpen}>
          <div className="flex space-x-4 p-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-500/30">
              <svg className="h-4 w-4 shrink-0 fill-current text-rose-500" viewBox="0 0 16 16">
                <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
              </svg>
            </div>
            <div>
              <div className="mb-2">
                <div className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                  Delete User
                </div>
              </div>
              <div className="mb-10 text-sm">
                <p>Are you sure you want to delete this user?</p>
              </div>
              <div className="flex flex-wrap justify-end space-x-2">
                <button
                  className="btn-sm border-slate-200 text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-600"
                  onClick={() => setDeleteModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn-sm bg-rose-500 text-white hover:bg-rose-600"
                  onClick={handleUserDelete}
                >
                  Yes, Delete it
                </button>
              </div>
            </div>
          </div>
        </ModalBlank>

        {/* 编辑用户的模态框 */}
        <UserModal
           isOpen={editModalOpen}
           setIsOpen={setEditModalOpen}
           initialUser={currentUser || defaultUser } // 如果 currentUser 是 null，传递一个空对象
           onSave={handleUserSave}
        />
      </div>

      {/* Pagination */}
      <div className="mt-4">
        <PaginationClassic {...pagination} />
      </div>
    </>
  )
}

