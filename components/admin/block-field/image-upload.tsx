import React, { useCallback, useState, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'

interface ImageUploadProps {
  label: string
  name: string
  value?: string
  onChange: (file: File, oldFilePath?: string) => void
  additional?: {
    required?: boolean
    oldFilePath?: string
  }
}

const ImageUpload: React.FC<ImageUploadProps> = ({ label, name, value, onChange, additional }) => {
  const [preview, setPreview] = useState<string | null>(value || null)
  const [oldFilePath, setOldFilePath] = useState<string | null>(additional?.oldFilePath || null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      onChange(file, oldFilePath)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      setOldFilePath(null) // Clear old file path once a new file is uploaded
    },
    [onChange, oldFilePath]
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxFiles: 1,
  })

  return (
    <div className="mt-2 w-full max-w-xl">
      <label className="mb-1 block text-sm font-medium" htmlFor={name}>
        {label}
        {additional?.required && <span className="text-rose-500">*</span>}
      </label>
      <div
        {...getRootProps()}
        className="mt-2 flex cursor-pointer justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
      >
        <input {...getInputProps()} name={name} id={name} />
        {oldFilePath && <input type="hidden" name="oldFilePath" value={oldFilePath} />}
        <div className="text-center">
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
                  <span>Upload a file</span>
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ImageUpload
