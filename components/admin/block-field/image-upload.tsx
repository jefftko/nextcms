import React, { useCallback, useState, useEffect } from 'react'
import ModalAction from '@/components/admin/wrappers/modal-action'

interface ImageUploadProps {
  label: string
  name: string
  value?: string
  onChange: (file: File) => void
  additional?: {
    required?: boolean
  }
}

const ImageUpload: React.FC<ImageUploadProps> = ({ label, name, value, onChange, additional }) => {
  const [preview, setPreview] = useState<string | null>(value || null)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mt-2 w-full max-w-xl">
      <label className="mb-1 block text-sm font-medium" htmlFor={name}>
        {label}
        {additional?.required && <span className="text-rose-500">*</span>}
      </label>
      <div className="mt-2 flex cursor-pointer justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
        <div className="text-center" onClick={() => setIsOpen(true)}>
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="mx-auto h-24 w-auto max-w-full object-cover"
            />
          ) : (
            <>
              <svg
                className="mx-auto h-12 w-12 text-gray-300"
                aria-hidden="true"
                viewBox="0 0 16 16"
              >
                <path d="M15 2h-2V0h-2v2H9V0H7v2H5V0H3v2H1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1zm-1 12H2V6h12v8z" />
              </svg>
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                  <span>Choose a file</span>
                </label>
              </div>
            </>
          )}
        </div>
      </div>
      <ModalAction isOpen={isOpen} setIsOpen={setIsOpen}>
        asdfasdfasd
      </ModalAction>
    </div>
  )
}

export default ImageUpload
