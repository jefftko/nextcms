'use client'
import { useState, useCallback, useRef, useEffect } from 'react'
import ModalAction from '@/components/admin/wrappers/modal-action'
import { uploadFile } from '@/services/fileService'
import { useMessage } from '@/app/admin/message-provider'
import { useMediaProvider } from '@/app/admin/media-provider'
import { useDropzone } from 'react-dropzone'
import ReactCrop, { type Crop, type PixelCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { ArrowUpOnSquareStackIcon, ArrowUpOnSquareIcon } from '@heroicons/react/24/solid'

export default function Upload() {
  const [isOpen, setIsOpen] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [crop, setCrop] = useState<Crop | undefined>(undefined) // 将初始值设置为 undefined
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null)
  const { setToast } = useMessage()
  const [fileName, setFileName] = useState<string | null>(null)
  const { filePath } = useMediaProvider()
  const [uploading, setUploading] = useState(false)
  const [aspect, setAspect] = useState<number | undefined>(1)
  const imgRef = useRef<HTMLImageElement | null>(null)
  const originalFileRef = useRef<File | null>(null)

  const aspectOptions = [
    { value: '1', label: '1:1' },
    { value: '16/9', label: '16:9' },
    { value: '4/3', label: '4:3' },
    { value: '3/2', label: '3:2' },
    { value: '2/3', label: '2:3' },
    { value: '3/4', label: '3:4' },
    { value: '9/16', label: '9:16' },
    { value: 'custom', label: 'Custom' },
    { value: 'original', label: 'Original' },
  ]

  const [selectedAspect, setSelectedAspect] = useState('1')
  const [customAspect, setCustomAspect] = useState('')

  const handleAspectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setSelectedAspect(value)
    if (value === 'original') {
      setAspect(undefined)
      setCrop(undefined) // 这里可以设置为 undefined
    } else if (value !== 'custom') {
      const newAspect = eval(value)
      setAspect(newAspect)
      updateCrop(newAspect)
    } else {
      setAspect(undefined)
      setCrop({ unit: '%', x: 25, y: 25, width: 50, height: 50 })
    }
  }

  const handleCustomAspectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCustomAspect(value)
    const [width, height] = value.split(':').map(Number)
    if (width && height && width > 0 && height > 0) {
      const newAspect = width / height
      setAspect(newAspect)
      updateCrop(newAspect)
    } else {
      setAspect(undefined)
      setCrop({ unit: '%', x: 25, y: 25, width: 50, height: 50 })
    }
  }

  const updateCrop = (newAspect: number) => {
    setCrop((prevCrop) => ({
      unit: '%',
      width: 50,
      height: 50 / newAspect,
      x: 25,
      y: (100 - 50 / newAspect) / 2,
    }))
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    originalFileRef.current = file
    setFileName(file.name)
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.tiff', '.webp'] },
    maxFiles: 1,
  })

  const onImageLoaded = (image: HTMLImageElement) => {
    imgRef.current = image
  }

  const onCropComplete = (crop: PixelCrop) => {
    setCompletedCrop(crop)
  }

  const getCroppedImage = async (
    image: HTMLImageElement,
    crop: PixelCrop
  ): Promise<Blob | null> => {
    if (!crop.width || !crop.height) {
      return null
    }
    const canvas = document.createElement('canvas')
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    canvas.width = crop.width
    canvas.height = crop.height
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      return null
    }

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    )

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob)
        } else {
          reject(new Error('Canvas is empty'))
        }
      }, 'image/jpeg')
    })
  }

  const handleCropAndUpload = async () => {
    if (completedCrop && imgRef.current) {
      const croppedBlob = await getCroppedImage(imgRef.current, completedCrop)
      handleUpload(croppedBlob, fileName)
    } else {
      setToast({ type: 'error', message: 'No image to crop' })
    }
  }

  const handleOriginalAndUpload = async () => {
    if (originalFileRef.current) {
      handleUpload(originalFileRef.current, fileName)
    } else {
      setToast({ type: 'error', message: 'No image to upload' })
    }
  }

  const handleUpload = async (croppedImage: Blob | null, fileName: string | null) => {
    if (!croppedImage || !fileName) {
      setToast({ type: 'error', message: 'No image to upload' })
      return
    }

    const file_path = filePath.length > 0 ? filePath.join('/') : ''
    const fileWithExt = new File([croppedImage], fileName, { type: croppedImage.type })

    try {
      const res = await uploadFile(fileWithExt, {
        action: 'upload_image',
        file_path,
        type: 'images',
      })
      setToast({ type: 'success', message: 'File uploaded successfully' })
      setIsOpen(false)
      setTimeout(() => {
        location.reload()
      }, 1000)
    } catch (error) {
      setToast({ type: 'error', message: error.message })
    }
  }

  useEffect(() => {
    if (aspect) {
      setCrop((prevCrop) => {
        if (prevCrop) {
          return {
            ...prevCrop,
            height: prevCrop.width / aspect,
          }
        }
        return undefined
      })
    }
  }, [aspect])

  return (
    <div>
      <button
        className="btn bg-indigo-500 text-white hover:bg-indigo-600"
        onClick={() => setIsOpen(true)}
      >
        <svg className="h-4 w-4 shrink-0 fill-current opacity-50" viewBox="0 0 16 16">
          <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
        </svg>
        <span className="ml-2 hidden sm:block">Upload</span>
      </button>
      <ModalAction isOpen={isOpen} setIsOpen={setIsOpen}>
        <div className="mt-2 w-full max-w-xl">
          <label className="mb-1 block text-sm font-medium">Image</label>
          {preview ? (
            <>
              <div className="mb-4 flex items-center gap-2">
                <select
                  value={selectedAspect}
                  onChange={handleAspectChange}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  {aspectOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {selectedAspect === 'custom' && (
                  <input
                    type="text"
                    value={customAspect}
                    onChange={handleCustomAspectChange}
                    placeholder="宽:高 (例如 16:9)"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                )}
              </div>
              <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => {
                  onCropComplete(c)
                  onImageLoaded
                }}
                aspect={aspect}
              >
                <img src={preview} alt="Preview" ref={imgRef} />
              </ReactCrop>

              {/* btn group */}
              <div className="mt-4 flex justify-center">
                <button
                  className="btn bg-indigo-500 text-white hover:bg-indigo-600"
                  onClick={() => {
                    if (selectedAspect === 'original') {
                      handleOriginalAndUpload()
                    } else {
                      handleCropAndUpload()
                    }
                  }}
                >
                  <ArrowUpOnSquareStackIcon className="h-4 w-4 shrink-0 fill-current opacity-50" />
                  <span className="ml-2">
                    {selectedAspect === 'original' ? '上传原图' : '上传裁剪后的图片'}
                  </span>
                </button>
              </div>
            </>
          ) : (
            <>
              <div
                {...getRootProps()}
                className="mt-2 flex cursor-pointer justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
              >
                <input {...getInputProps()} />
                <div className="text-center">
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
                </div>
              </div>
            </>
          )}
        </div>
      </ModalAction>
    </div>
  )
}
