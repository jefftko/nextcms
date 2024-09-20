'use client'
import React, { useEffect, useState } from 'react'
import Loading from '@/components/ui/Loading'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { components } from '@/components/MDXComponents'
import PostSimple from '@/layouts/PostSimple'
import PostLayout from '@/layouts/PostLayout'
import PostBanner from '@/layouts/PostBanner'
import { sortPosts, coreContent, allCoreContent } from 'pliny/utils/contentlayer'
const defaultLayout = 'PostLayout'
import { allContents, allAuthors } from 'contentlayer/generated'
import type { Authors, Content as Blog } from 'contentlayer/generated'
const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
}
export default function EditorBody() {
  //const currentOrigin = window.location.origin
  const [currentOrigin, setCurrentOrigin] = useState<string>('')
  const [layout, setLayout] = useState('layoutDefault')
  const [post, setPost] = useState(null)

  useEffect(() => {
    // set showOverlay to true

    if (typeof window !== 'undefined') {
      setCurrentOrigin(window.location.origin)
    }
    const handleMessage = (event: MessageEvent) => {
      // 检查消息来源是否符合预期
      if (event.origin !== currentOrigin) {
        return
      }
      //console.log('Message received from parent:', event.data.blocks);
      const { type, layout, commonData } = event.data
    
      if (type === 'globalData') {
        setPost(commonData)
        console.log('globalData', commonData.body.code)
      }

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
  const Layout = layouts[post?.layout || defaultLayout]
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(post?.structuredData) }}
      />
     {post? <Layout content={coreContent(post)}>
         <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc}  /> 
      </Layout> : <Loading />}
    </>
  )
}
