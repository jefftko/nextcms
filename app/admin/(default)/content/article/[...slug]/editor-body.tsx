'use client'

import { useState, useEffect, useRef } from 'react'
import { useArticleData } from '@/app/admin/article-data'
import ReactMarkdown from 'react-markdown'
import { useRouter } from 'next/navigation'
import { useMessage } from '@/app/admin/message-provider'
import { editContent, createContent } from '@/utils/contentActions'
import EasyMDE from 'easymde'
import 'easymde/dist/easymde.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

export default function EditorBody() {
  const { articleData, setArticleData, action } = useArticleData()
  const [isPreview, setIsPreview] = useState(false)
  const router = useRouter()
  const { setToast } = useMessage()
  const editorRef = useRef(null)
  const easyMDEInstance = useRef(null)

  useEffect(() => {
    if (!editorRef.current) return

    console.log(articleData)

    easyMDEInstance.current = new EasyMDE({
      element: editorRef.current,
      initialValue: articleData.content || '',
      autoDownloadFontAwesome: false,
      spellChecker: false,
      status: false,
      minHeight: '400px',
    })

    easyMDEInstance.current.codemirror.on('change', () => {
      if (easyMDEInstance.current) {
        setArticleData({ ...articleData, content: easyMDEInstance.current.value() })
      }
    })

    return () => {
      if (easyMDEInstance.current) {
        easyMDEInstance.current.toTextArea()
        easyMDEInstance.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (easyMDEInstance.current) {
      if (articleData.body.raw !== easyMDEInstance.current.value()) {
        easyMDEInstance.current.value(articleData.body.raw)
      }
    }
  }, [articleData.body])

  const handleSave = async () => {
    try {
      let resData
      if (action === 'edit') {
        resData = await editContent(articleData)
      } else {
        resData = await createContent(articleData)
      }
      if (resData && resData.status === 'success') {
        setToast({ message: 'Article saved successfully', type: 'success' })
        if (action === 'create') {
          router.push(`/admin/content/article/edit/${articleData.slug}`)
        }
      } else {
        setToast({ message: resData.message || 'Error saving article', type: 'error' })
      }
    } catch (error) {
      setToast({ message: 'Error saving article', type: 'error' })
      console.error('Error saving article:', error)
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="bg-white p-4 border-b flex justify-between items-center">
        <button
          onClick={() => router.push('/admin/content/articles')}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Back to Articles
        </button>
        <button
          onClick={() => setIsPreview(!isPreview)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isPreview ? 'Edit' : 'Preview'}
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Save
        </button>
      </div>
      <div className="flex-1 p-4 overflow-auto">
        {isPreview ? (
          <div className="prose max-w-none">
            <ReactMarkdown>{articleData.body.raw}</ReactMarkdown>
          </div>
        ) : (
          <textarea ref={editorRef} />
        )}
      </div>
    </div>
  )
}
