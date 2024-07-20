'use client'
import { useState,useCallback } from 'react'
import ModalAction from '@/components/admin/wrappers/modal-action'
import { uploadFile } from '@/services/fileService'
import { useMessage } from '@/app/admin/message-provider'
import { useMediaProvider } from '@/app/admin/media-provider'
import { useDropzone } from 'react-dropzone'

export default function Upload() {
  const [isOpen, setIsOpen] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const { setToast } = useMessage()
  const { filePath } = useMediaProvider()

   const onChange = async (file: File) => {
    try {
      const file_path = filePath.length > 0 ? filePath.join('/') : ''
      const res = await uploadFile(file, { action: 'upload_image', file_path,type:'images' })
      setToast({ type: 'success', message: 'File uploaded successfully' })
      location.reload()
    } catch (error) {
      setToast({ type: 'error', message: error.message })
    }
   }

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      onChange(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    },
    [onChange]
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {'image/*':['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.tiff', '.webp']},
    maxFiles: 1,
  })


  return (
    <div>
        <button className="btn bg-indigo-500 text-white hover:bg-indigo-600" onClick={() => setIsOpen(true)}>
          <svg className="h-4 w-4 shrink-0 fill-current opacity-50" viewBox="0 0 16 16">
            <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
          </svg>
          <span className="ml-2 hidden sm:block">Upload</span>
        </button>
      <ModalAction isOpen={isOpen} setIsOpen={setIsOpen}>
       <div className="mt-2 w-full max-w-xl">
      <label className="mb-1 block text-sm font-medium">
      Image
      </label>
      <div
        {...getRootProps()}
        className="mt-2 flex cursor-pointer justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
      >
      <input {...getInputProps()} />
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

      </ModalAction>
    </div>
  )
}
