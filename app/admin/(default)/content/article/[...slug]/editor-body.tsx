'use client'

import { useState, useEffect, useRef } from 'react'
import { useArticleData } from '@/app/admin/article-data'
import { useRouter } from 'next/navigation'
import { useMessage } from '@/app/admin/message-provider'
import { useFlyoutContext } from '@/app/admin/flyout-context'
import EditorPanel from './editor-panel'

export default function EditorBody() {
  const { articleData, setArticleData, action } = useArticleData()
  const router = useRouter()
  const { setToast } = useMessage()
  const [iframeUrl, setIframeUrl] = useState('/content/editor')
  const { setFlyoutOpen } = useFlyoutContext()
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [currentOrigin, setCurrentOrigin] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentOrigin(window.location.origin)
    }
  }, [])

  useEffect(() => {
    if (articleData) {
      const encodedData = encodeURIComponent(JSON.stringify(articleData))
      //sendMessageToIframe({ type: 'globalData', commonData: articleData })
      //setIframeUrl(`content/editor?data=${encodedData}&action=${action}`)
    }
  }, [articleData, action,currentOrigin])

  const sendMessageToIframe = (data) => {
    const iframeWindow = iframeRef.current?.contentWindow
    if (iframeWindow && currentOrigin) {
      iframeWindow.postMessage(data, currentOrigin)
    }
  }

  const handleMessage = (event) => {
    if (event.origin !== currentOrigin) return

    const { type, data } = event.data
    if (type === 'save') {
      setArticleData(data)
      setToast({ message: '文章保存成功', type: 'success' })
      if (action === 'create') {
        router.push(`/admin/content/article/edit/${data.slug}`)
      }
    } else if (type === 'editBlock' || type === 'editCommon') {
      setFlyoutOpen(true)
      sendMessageToIframe({ type: 'highlight', blockId: data.blockId })
    }
    if (type === 'editor-ready') {
      sendMessageToIframe({ type: 'globalData', commonData: articleData })
      console.log('editor-ready', articleData)
    }
  }

  useEffect(() => {
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [currentOrigin])

  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-white p-4 border-b flex justify-between items-center">
        <button
          onClick={() => router.push('/admin/content/articles')}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          返回文章列表
        </button>

       {/* button to show article properties */}
       <button
          onClick={() => setFlyoutOpen(true)}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Properties
        </button>

        
      </div>
      <div className="flex-1 p-4 overflow-auto">
        {iframeUrl && (
          <iframe
            ref={iframeRef}
            src={`${currentOrigin}/${iframeUrl}`}
            className="w-full h-full border-0"
            title="文章编辑器"
          />
        )}
      </div>
      <EditorPanel />
    </div>
  )
}
