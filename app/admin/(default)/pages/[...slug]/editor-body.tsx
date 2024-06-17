'use client'
import EditorHeader from './editor-header'
import { useState, useEffect, useRef, useCallback } from 'react'
import { usePageData } from '@/app/admin/page-data'
import { useFlyoutContext } from '@/app/admin/flyout-context'

export default function EditorBody() {
  const [widthType, setWidthType] = useState<string>('desktop')
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const iframeSrc = '/editor'
  const { pageData, blockId, setBlockId } = usePageData()
  const [currentOrigin, setCurrentOrigin] = useState<string>('')
  const { flyoutOpen, setFlyoutOpen } = useFlyoutContext()

  const sendMessageToIframe = (data, origin) => {
    const iframeWindow = iframeRef.current?.contentWindow
    if (iframeWindow && origin !== '') {
      iframeWindow.postMessage(data, origin)
    }
  }
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentOrigin(window.location.origin)
    }
    const handleMessage = (event: MessageEvent) => {
      // 检查消息来源是否符合预期，例如通过 event.origin
      if (event.origin !== currentOrigin) {
        return
      }
      //console.log('Message received from iframe:', event.data)
      // 这里可以根据接收到的消息进行处理
      //sendMessageToIframe()
      if (event.data.type === 'editor-ready') {
        sendMessageToIframe(pageData, currentOrigin)
        //console.log('Editor ready',event.data)
      }

      //Block edit form
      if (event.data.type === 'editBlock') {
        console.log('editBlock', event.data)
        setBlockId(null)
        setTimeout(() => {
          setBlockId(event.data.id)
        }, 200)
      }
    }
    if (currentOrigin !== '') {
      sendMessageToIframe(pageData, currentOrigin)
    }

    window.addEventListener('message', handleMessage)

    // 组件卸载时移除事件监听器
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [pageData, currentOrigin, blockId])

  useEffect(() => {
    //sendMessageToIframe({type: 'set-width', width: widthType}, currentOrigin)
    sendMessageToIframe({ type: 'highlight', blockId }, currentOrigin)
    console.log('blockId', blockId)
  }, [blockId])

  return (
    <div
      id="page-preview"
      className={`flex grow flex-col overflow-y-auto overflow-x-hidden transition-transform duration-300 ease-in-out md:translate-x-0`}
    >
      {/* header bar */}
      <EditorHeader setWidth={setWidthType} />

      {/* iframe */}
      <div className="relative grow px-4 py-2 sm:px-1 md:px-2 [&>*:first-child]:scroll-mt-16">
        <div className="h-full">
          <iframe
            id="page-preview-iframe"
            ref={iframeRef}
            title="Page Preview"
            src={`${currentOrigin}${iframeSrc}`}
            className={`${widthType == 'desktop' ? 'h-full w-full' : 'h-[667px] w-[375px]'} transition-width mx-auto rounded-lg bg-white shadow-lg duration-300 ease-in-out`}
            frameBorder="0"
          ></iframe>
        </div>
      </div>
    </div>
  )
}
