// components/admin/user-modal.tsx
'use client'
import React, { useState, useEffect } from 'react'
import ModalBasic from '@/components/admin/modal-basic'

interface UserModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  initialUser?: {
    id?: string
    name: string
    username: string
    email: string
    password?: string
    role: string
    status: string
  }
  onSave: (user: {
    id?: string
    name: string
    username: string
    email: string
    password?: string
    role: string
    status: string
  }) => void
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, setIsOpen, initialUser, onSave }) => {
  const [user, setUser] = useState(
    initialUser || {
      id: '',
      name: '',
      username: '',
      email: '',
      password: '',
      role: 'admin',
      status: 'active',
    }
  )

  useEffect(() => {
    if (initialUser) {
      setUser(initialUser)
    }
  }, [initialUser])

  const handleSave = () => {
    onSave(user)
    setIsOpen(false)
  }

  return (
    <ModalBasic isOpen={isOpen} setIsOpen={setIsOpen} title="User Details">
      <div className="px-5 py-4">
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              value={user?.name || ''}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              className="form-input w-full px-2 py-1"
              type="text"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="username">
              UserName
            </label>
            <input
              id="username"
              value={user?.username || ''}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="form-input w-full px-2 py-1"
              type="text"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              value={user?.email || ''}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="form-input w-full px-2 py-1"
              type="email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="role">
              Role
            </label>
            <select
              id="role"
              value={user?.role || 'admin'}
              onChange={(e) => setUser({ ...user, role: e.target.value })}
              className="form-select w-full px-2 py-1"
            >
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
            </select>
          </div>
          {!user.id && (
            <div>
              <label className="block text-sm font-medium" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                value={user?.password || ''}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="form-input w-full px-2 py-1"
                type="password"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium" htmlFor="status">
              Status
            </label>
            <select
              id="status"
              value={user?.status || 'active'}
              onChange={(e) => setUser({ ...user, status: e.target.value })}
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
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button
            className="btn-sm bg-indigo-500 text-white hover:bg-indigo-600"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </ModalBasic>
  )
}

export default UserModal
