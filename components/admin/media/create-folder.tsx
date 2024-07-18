'use client'
import { useState } from 'react'
import ModalAction from '@/components/admin/wrappers/modal-action'
import { createFolder } from '@/services/fileService'
import { useMessage } from '@/app/admin/message-provider'
import { useMediaProvider } from '@/app/admin/media-provider'

export default function CreateFolder() {
  const [isOpen, setIsOpen] = useState(false)
  const [folderName, setFolderName] = useState('')
  const { setToast } = useMessage()
  const { filePath } = useMediaProvider()

  const handleCreateFolder = async (event) => {
    event.preventDefault()

    try {
      const response = await createFolder({
        directory_name: folderName,
        file_path: filePath.join('/'),
        type: 'images',
      })

      if (response.status === 'success') {
        setToast({ message: 'Folder created successfully', type: 'success' })
      } else {
        setToast({ message: response.message, type: 'error' })
      }
    } catch (error) {
      console.error('Error creating folder:', error)
      setToast({ message: 'An error occurred while creating the folder', type: 'error' })
    } finally {
      setIsOpen(false)
      setFolderName('')
    }
  }

  return (
    <div>
      <button
        className="btn border-slate-200 text-indigo-500 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600"
        onClick={() => setIsOpen(true)}
      >
        Create Folder
      </button>
      <ModalAction isOpen={isOpen} setIsOpen={setIsOpen}>
        <div>
          <h1 className="mb-4 text-center text-lg font-semibold">Create Folder</h1>
          <form onSubmit={handleCreateFolder} className="flex flex-col items-center">
            <input
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              className="form-input mb-4 w-full rounded-md border border-slate-300 px-2 py-1"
              placeholder="Enter folder name"
              required
            />
            <button type="submit" className="btn bg-indigo-500 text-white hover:bg-indigo-600">
              Create
            </button>
          </form>
        </div>
      </ModalAction>
    </div>
  )
}
