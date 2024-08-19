'use client'
import React, { useState } from 'react'
import ModalBasic from '@/components/admin/modal-basic'
import { useAppProvider } from '@/app/admin/app-provider'
import { useMessage } from '@/app/admin/message-provider'
import { createUser } from '@/services/userService'

export default function PageHeader() {
  const [addUserModalOpen, setAddUserModalOpen] = useState(false)
  const { setLoading } = useAppProvider()
  const { setToast } = useMessage()
  const [newUser, setNewUser] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    role: 'admin',
    status: 'active',
  })

  const handleUserAdd = async () => {
    //check user fields
    if (!newUser.name || !newUser.username || !newUser.email || !newUser.password) {
      setToast({ message: 'Please fill all fields', type: 'error' })
      return
    }
    setAddUserModalOpen(false)
    setLoading(true)
    const res = await createUser(newUser)
    setLoading(false)
    if (res.status == 'success') {
      setNewUser({
        name: '',
        username: '',
        email: '',
        password: '',
        role: 'admin',
        status: 'active',
      })
      setToast({ message: 'User added successfully', type: 'success' })
    } else {
      setToast({ message: res.message, type: 'error' })
    }
  }

  return (
    <>
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
          <button
            className="btn bg-indigo-500 text-white hover:bg-indigo-600"
            onClick={() => setAddUserModalOpen(true)}
          >
            <svg className="h-4 w-4 shrink-0 fill-current opacity-50" viewBox="0 0 16 16">
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="ml-2">Add User</span>
          </button>
        </div>
      </div>
      {/* 新增用户的模态框 */}
      <ModalBasic isOpen={addUserModalOpen} setIsOpen={setAddUserModalOpen} title="Add User">
        <div className="px-5 py-4">
          <div className="space-y-3">
            <div>
              <label className="mb-1 block text-sm font-medium" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                className="form-input w-full px-2 py-1"
                type="text"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium" htmlFor="username">
                UserName
              </label>
              <input
                id="username"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                className="form-input w-full px-2 py-1"
                type="text"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                className="form-input w-full px-2 py-1"
                type="email"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium" htmlFor="role">
                Role
              </label>
              <select
                id="role"
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                className="form-select w-full px-2 py-1"
              >
                <option value="admin">Admin</option>
                <option value="editor">Editor</option>
              </select>
            </div>
            {/* password */}
            <div>
              <label className="mb-1 block text-sm font-medium" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                className="form-input w-full px-2 py-1"
                type="text"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium" htmlFor="status">
                Status
              </label>
              <select
                id="status"
                value={newUser.status}
                onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
                className="form-select w-full px-2 py-1"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-200 px-5 py-4 dark:border-slate-700">
          <div className="flex flex-wrap justify-end space-x-2">
            <button
              className="btn-sm border-slate-200 text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-600"
              onClick={() => setAddUserModalOpen(false)}
            >
              Cancel
            </button>
            <button
              onClick={handleUserAdd}
              className="btn-sm bg-indigo-500 text-white hover:bg-indigo-600"
            >
              Confirm
            </button>
          </div>
        </div>
      </ModalBasic>
    </>
  )
}
