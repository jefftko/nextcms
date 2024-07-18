'use client'
import React, { useState, useEffect } from 'react'

interface FileItem {
  name: string
  isDirectory: boolean
}

const FileManager: React.FC = () => {
  const [files, setFiles] = useState<FileItem[]>([])
  const [currentDir, setCurrentDir] = useState('')
  const [newDir, setNewDir] = useState('')

  useEffect(() => {
    fetchFiles()
  }, [currentDir])

  const fetchFiles = async () => {
    try {
      //const response = await axios.get(`/api/files?dir=${currentDir}`)
      //setFiles(response.data.files)
    } catch (error) {
      console.error('Error fetching files:', error)
    }
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append('file', file)
      formData.append('subDir', currentDir)

      try {
        //await axios.post('/api/files/upload', formData)
        fetchFiles()
      } catch (error) {
        console.error('Error uploading file:', error)
      }
    }
  }

  const handleNewDir = async () => {
    try {
      //await axios.put(`/api/files?dir=${currentDir}&name=${newDir}`)
      setNewDir('')
      fetchFiles()
    } catch (error) {
      console.error('Error creating directory:', error)
    }
  }

  const handleDelete = async (name: string) => {
    try {
      //await axios.delete(`/api/files?dir=${currentDir}&name=${name}`)
      fetchFiles()
    } catch (error) {
      console.error('Error deleting file:', error)
    }
  }

  return (
    <div>
      <h1>File Manager</h1>
      <div>
        <input type="file" onChange={handleUpload} />
        <input
          type="text"
          placeholder="New Directory"
          value={newDir}
          onChange={(e) => setNewDir(e.target.value)}
        />
        <button onClick={handleNewDir}>Create Directory</button>
      </div>
      <div>
        {files.map((file) => (
          <div key={file.name}>
            {file.isDirectory ? (
              <button onClick={() => setCurrentDir(`${currentDir}/${file.name}`)}>
                {file.name}
              </button>
            ) : (
              <span>{file.name}</span>
            )}
            <button onClick={() => handleDelete(file.name)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FileManager
