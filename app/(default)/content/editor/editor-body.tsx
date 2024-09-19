'use client'
import React, { useEffect, useState } from 'react'
import { ContentBlocks } from '@/components/BlocksRenderer'
import Layout, { layouts } from '@/layouts/index'
import { useAppProvider } from '@/app/app-provider'
import Loading from '@/components/ui/Loading'

export default function EditorBody() {
  const [blocks, setBlocks] = useState([])
  //const currentOrigin = window.location.origin
  const [currentOrigin, setCurrentOrigin] = useState<string>('')
  const [layout, setLayout] = useState('layoutDefault')
  const { setShowOverlay, globalData, setGlobalData } = useAppProvider()

  useEffect(() => {
    // set showOverlay to true
    setShowOverlay(true)

    if (typeof window !== 'undefined') {
      setCurrentOrigin(window.location.origin)
    }
    const handleMessage = (event: MessageEvent) => {
      // 检查消息来源是否符合预期
      if (event.origin !== currentOrigin) {
        return
      }
      //console.log('Message received from parent:', event.data.blocks);
      const { type, blockId, blocks, layout, commonData } = event.data

      if (type === 'highlight' && blockId) {
        console.log('highlight', blockId)
        const blockElement = document.getElementById(blockId)
        if (blockElement) {
          blockElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
          blockElement.classList.add('highlight')
          setTimeout(() => {
            blockElement.classList.remove('highlight')
          }, 2000)
        }
      }

      if (commonData && commonData !== undefined && type === 'globalData') {
        setGlobalData(commonData)
      }

      if (blocks) {
        setBlocks(blocks)
      }
      if (layout && layout !== undefined && layout != 'default') {
        setLayout(layout)
      }
    }
    window.addEventListener('message', handleMessage)
    // 加载完后，发送初始化消息给父窗口
    sendMessage({ type: 'editor-ready' }, currentOrigin)

    // 组件卸载时移除事件监听器
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [currentOrigin])

  // send message to parent
  const sendMessage = (data, origin) => {
    if (typeof window === 'undefined' || origin === '') {
      return
    }
    window.parent.postMessage(data, origin)
  }

  return (
    <>
      <Layout layout={layout as keyof typeof layouts}>
        {/*blocks.length === 0 ? (<Loading />):(<ContentBlocks blocks={blocks} />)*/}
        {blocks.length === 0 ? <Loading /> : <ContentBlocks blocks={blocks} />}
      </Layout>
    </>
  )
}
