'use client'
import { useState } from 'react'
import ModalAction from '@/components/admin/wrappers/modal-action'
import { createFolder } from '@/services/fileService'
import { useMessage } from '@/app/admin/message-provider'

export default function CreateFolder() {
  const [isOpen, setIsOpen] = useState(false)
  const [folderName, setFolderName] = useState('')
  const { setToast } = useMessage()

  const handleCreateFolder = async (event) => {
    event.preventDefault()
    
    try {
      const response = await createFolder({ directory_name: folderName })

      if (response.status == 'success') {
          setToast({ message: 'Folder created successfully', type: 'success' })
      } else {
         setToast({ message: response.message , type: 'error' })
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
      <button className="btn dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-indigo-500" onClick={()=> setIsOpen(true)}>
        Create Folder
      </button>
      <ModalAction isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div>
          <h1 className="text-lg font-semibold text-center mb-4">Create Folder</h1>
          <form onSubmit={handleCreateFolder} className="flex flex-col items-center">
            <input 
              type="text" 
              value={folderName} 
              onChange={(e) => setFolderName(e.target.value)} 
              className="form-input mb-4 w-full px-2 py-1 border border-slate-300 rounded-md" 
              placeholder="Enter folder name"
              required 
            />
            <button type="submit" className="btn bg-indigo-500 hover:bg-indigo-600 text-white">Create</button>
          </form>
        </div>
      </ModalAction>
    </div>
  )
}
