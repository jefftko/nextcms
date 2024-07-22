'use client'

import { useEffect, useRef } from 'react'
import MediaManager from '@/components/admin/media/media-manager'
import MediaHeader from '@/components/admin/media/media-header'
import { useMediaProvider } from '@/app/admin/media-provider'
import { useFlyoutContext } from '@/app/admin/flyout-context'
import { useRouter } from 'next/navigation'

interface MediaBodyProps {
  files: any[]
  file_path?: string[]
}
//props include files and filePath
export default function MediaBody({ files, file_path }: MediaBodyProps) {
  const { setFilePath } = useMediaProvider()
  const router = useRouter()
  const { setFlyoutOpen } = useFlyoutContext()
  useEffect(() => {
    if (setFilePath && file_path !== undefined) {
      setFilePath(file_path)
    }
  }, [file_path])

  const handlePath = (index) => {
    if (index === -1) {
      router.push(`/admin/media`)
    } else {
      router.push(`/admin/media/${file_path?.slice(0, index + 1).join('/')}`)
    }
  }

  const handleImage = (e) => {
    if (e.type === 'directory') {
      //split with source ,but remove empty string
      //setFilePath(e.source.split('/').filter(Boolean))
      router.push(`/admin/media/${e.source}`)
    } else {
      setFlyoutOpen(true)
    }
  }

  return (
    <>
      <MediaHeader />
      <MediaManager
        data={files}
        file_path={file_path}
        onPathChange={handlePath}
        onItemChange={handleImage}
      />
    </>
  )
}
