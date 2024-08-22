'use client'
import React, { useState } from 'react'
import UserModal from './user-modal'
import { createUser } from '@/services/userService'
import { useAppProvider } from '@/app/admin/app-provider'
import { useMessage } from '@/app/admin/message-provider'

export default function PageHeader() {
  const [addUserModalOpen, setAddUserModalOpen] = useState(false)
  const [editUserModalOpen, setEditUserModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const { setLoading } = useAppProvider()
  const { setToast } = useMessage()

  const handleUserSave = async (user) => {
    setLoading(true)
    let res
    // Creating new user
    res = await createUser(user)
    setLoading(false)

    if (res.status == 'success') {
      setToast({ message: 'User saved successfully', type: 'success' })
      setSelectedUser(null)
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
            onClick={() => {
              setSelectedUser(null) // Clear selected user
              setAddUserModalOpen(true)
            }}
          >
            <svg className="h-4 w-4 shrink-0 fill-current opacity-50" viewBox="0 0 16 16">
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="ml-2">Add User</span>
          </button>
        </div>
      </div>

      {/* New User Modal */}
      <UserModal
        isOpen={addUserModalOpen}
        setIsOpen={setAddUserModalOpen}
        initialUser={{
          name: '',
          username: '',
          email: '',
          password: '',
          role: 'admin',
          status: 'active',
        }}
        onSave={handleUserSave}
      />

      {/* Edit User Modal */}
      {selectedUser && (
        <UserModal
          isOpen={editUserModalOpen}
          setIsOpen={setEditUserModalOpen}
          initialUser={selectedUser}
          onSave={handleUserSave}
        />
      )}
    </>
  )
}
