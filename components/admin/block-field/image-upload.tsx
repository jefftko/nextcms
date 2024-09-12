import React, { useCallback, useState, useEffect } from 'react'
import ModalAction from '@/components/admin/wrappers/modal-action'
import { getFiles } from '@/services/fileService'
import MediaManager from '@/components/admin/media/media-manager'
import { PhotoIcon } from '@heroicons/react/20/solid'
import CropImagePanel from '@/components/admin/media/crop-image-panel'
import Image from 'next/image'

interface ImageUploadProps {
  label: string
  name: string
  value?: string
  onChange: (file: File) => void
  additional?: {
    required?: boolean
    aspectRatio?: number
  }
}

const tabs = [
  { name: 'Images', href: '#' },
  { name: 'Upload', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const ImageUpload: React.FC<ImageUploadProps> = ({ label, name, value, onChange, additional }) => {
  const [preview, setPreview] = useState<string | null>(value || null)
  const [isMediaOpen, setMediaIsOpen] = useState(false)
  const [filePath, setFilePath] = useState([])
  const [files, setFiles] = useState([])
  const [tabIndex, setTabIndex] = useState(0)
  const [defaultAspectRatio, setDefaultAspectRatio] = useState<number | undefined>(undefined)

  useEffect(() => {
    if (additional?.aspectRatio) {
      setDefaultAspectRatio(additional.aspectRatio)
    }
  }, [additional?.aspectRatio])

  const fetchFiles = async (query) => {
    const data = await getFiles(query)
    setFiles(data)
  }

  const handlePathChange = useCallback((path) => {
    if (path === -1) {
      setFilePath([])
    } else {
      setFilePath(path?.slice(0, path + 1).join('/'))
    }
  }, [])

  const handleItemChange = useCallback((item) => {
    if (item.type === 'directory') {
      setFilePath(item.source.split('/').filter(Boolean))
    } else {
      setMediaIsOpen(false)
      setTimeout(() => {
        onChange(item.source)
      }, 500)
      setPreview(item.source)
    }
  }, [])

  useEffect(() => {
    fetchFiles({ type: 'images', filePath: filePath?.join('/') })
  }, [filePath])

  return (
    <div className="mt-2 w-full max-w-xl">
      <label className="mb-1 block text-sm font-medium" htmlFor={name}>
        {label}
        {additional?.required && <span className="text-rose-500">*</span>}
      </label>
      <div className="mt-2 flex cursor-pointer justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
        <div className="text-center" onClick={() => setMediaIsOpen(true)}>
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="mx-auto h-24 w-auto max-w-full object-cover"
            />
          ) : (
            <>
              <PhotoIcon />
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                  <span>Choose a image</span>
                </label>
              </div>
            </>
          )}
        </div>
      </div>
      <ModalAction isOpen={isMediaOpen} setIsOpen={setMediaIsOpen}>
        <div className="border-b border-gray-200">
          <nav aria-label="Tabs" className="-mb-px flex space-x-8">
            {tabs.map((tab, index) => (
              <a
                key={tab.name}
                href={tab.href}
                onClick={() => setTabIndex(index)}
                className={classNames(
                  tabIndex == index
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium'
                )}
              >
                {tab.name}
              </a>
            ))}
          </nav>
        </div>
        <div className="mt-1.5 h-96 overflow-auto">
          {tabIndex == 0 && (
            <MediaManager
              data={files}
              file_path={filePath}
              onPathChange={handlePathChange}
              onItemChange={handleItemChange}
            />
          )}

          {tabIndex == 1 && (
            <CropImagePanel
              filePath={filePath}
              onItemChange={handleItemChange}
              defaultAspectRatio={defaultAspectRatio}
            />
          )}
        </div>
      </ModalAction>
    </div>
  )
}

export default ImageUpload
