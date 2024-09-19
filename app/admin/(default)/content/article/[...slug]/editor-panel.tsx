'use client'

import { useEffect, useRef } from 'react'
import { Transition } from '@headlessui/react'
import { useFlyoutContext } from '@/app/admin/flyout-context'
import { useArticleData } from '@/app/admin/article-data'

export default function EditorPanel() {
  const { flyoutOpen, setFlyoutOpen } = useFlyoutContext()
  const { articleData, setArticleData } = useArticleData()

  const handlePropertyChange = (property: string, value: string) => {
    setArticleData({ ...articleData, [property]: value })
  }

  const panelContent = useRef<HTMLDivElement>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)

  // 关闭面板的逻辑
  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget | null }) => {
      if (!panelContent.current || !closeBtn.current) return
      if (
        !flyoutOpen ||
        panelContent.current.contains(target as Node) ||
        closeBtn.current.contains(target as Node)
      )
        return
      setFlyoutOpen(false)
    }
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  })

  useEffect(() => {
    const keyHandler = ({ keyCode }: { keyCode: number }): void => {
      if (!flyoutOpen || keyCode !== 27) return
      setFlyoutOpen(false)
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  })

  return (
    <Transition
      show={flyoutOpen}
      unmount={false}
      as="div"
      id="editor-panel"
      ref={panelContent}
      className="absolute inset-0 z-20 shadow-xl sm:left-auto"
      enter="transition-transform duration-200 ease-in-out"
      enterFrom="translate-x-full"
      enterTo="translate-x-0"
      leave="transition-transform duration-200 ease-in-out"
      leaveFrom="translate-x-0"
      leaveTo="translate-x-full"
    >
      <div className="no-scrollbar sticky top-0 h-[calc(100dvh)] w-full shrink-0 overflow-y-auto overflow-x-hidden border-l border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-gradient-to-b dark:from-slate-800 dark:to-slate-900 sm:w-[390px]">
        <button
          ref={closeBtn}
          onClick={() => setFlyoutOpen(false)}
          className="group absolute right-0 top-0 mr-6 mt-6 p-2"
        >
          <svg
            className="pointer-events-none h-4 w-4 fill-slate-400 group-hover:fill-slate-600"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m7.95 6.536 4.242-4.243a1 1 0 1 1 1.415 1.414L9.364 7.95l4.243 4.242a1 1 0 1 1-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 0 1-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 0 1 1.414-1.414L7.95 6.536Z" />
          </svg>
        </button>
        {/* 面板内容 */}
        <div className="px-4 py-8 lg:px-8">
          <div className="mx-auto max-w-sm lg:max-w-none">
            {articleData && <h2>Article Properties: {articleData.id}</h2>}
            {/* 这里添加属性编辑表单 */}
            <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={articleData.title}
            onChange={(e) => handlePropertyChange('title', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Slug</label>
          <input
            type="text"
            value={articleData.slug}
            onChange={(e) => handlePropertyChange('slug', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            value={articleData.date.split('T')[0]}
            onChange={(e) => handlePropertyChange('date', new Date(e.target.value).toISOString())}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            value={articleData.draft ? 'draft' : 'published'}
            onChange={(e) => handlePropertyChange('draft', e.target.value === 'draft')}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>
      </div>
          </div>
        </div>
      </div>
    </Transition>
  )
}
