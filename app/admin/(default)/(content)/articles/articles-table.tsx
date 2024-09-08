'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ArticlesTableItem from './articles-table-item'
import ModalBasic from '@/components/admin/modal-basic'
import ModalBlank from '@/components/admin/modal-blank'
import { useMessage } from '@/app/admin/message-provider'
import { useAppProvider } from '@/app/admin/app-provider'
import type { Content } from 'contentlayer/generated'
import { deleteContent } from '@/utils/contentActions'
import { data } from 'autoprefixer'

export default function ArticlesTable({ articles, total }: { articles: Content[]; total: number }) {
  const { setToast } = useMessage()
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const { setLoading } = useAppProvider()
  const router = useRouter()
  const [copyArticle, setCopyArticle] = useState<Content | null>(null)

  const handleArticleDelete = async (articleData) => {
    // Implement delete logic here
    setLoading(true)
    setDeleteModalOpen(false)
    // API call to delete article
    const res = await deleteContent(articleData.slug)
    setLoading(false)
    if(res && res.status == 'success'){
      setToast({message:res?.message,type:'success'})
    }else{
      setToast({message:res?.message,type: 'error'})
    }
  }

  return (
    <>
      <div className="bg-white dark:bg-slate-800">
        <div>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-400 dark:bg-slate-700 dark:text-slate-500">
                <tr>
                  <th className="whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
                    <div className="text-left font-semibold">Title</div>
                  </th>
                  <th className="whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
                    <div className="text-left font-semibold">Slug</div>
                  </th>
                  <th className="whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
                    <div className="text-left font-semibold">Status</div>
                  </th>
                  <th className="whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
                    <div className="text-left font-semibold">Date</div>
                  </th>
                  <th className="whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
                    <div className="text-left font-semibold">Last Modified</div>
                  </th>
                  <th className="whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
                    <div className="text-left font-semibold">Actions</div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm dark:divide-slate-700">
                {articles.map((article) => (
                  <ArticlesTableItem
                    key={article.slug}
                    article={article}
                    handleDelete={() => {
                      setCopyArticle(article)
                      setDeleteModalOpen(true)
                    }}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      

      {/* Delete Modal */}
      <ModalBlank
        isOpen={deleteModalOpen}
        setIsOpen={setDeleteModalOpen}
      >
        <div className="p-5 flex space-x-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-rose-100">
            <svg className="w-4 h-4 shrink-0 fill-current text-rose-500" viewBox="0 0 16 16">
              <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
            </svg>
          </div>
          <div>
            <div className="mb-2">
              <div className="text-lg font-semibold text-slate-800">Delete Article</div>
            </div>
            <div className="text-sm mb-10">
              <div className="space-y-2">
                <p>Are you sure you want to delete this article?</p>
              </div>
            </div>
            <div className="flex flex-wrap justify-end space-x-2">
              <button
                className="btn-sm border-slate-200 hover:border-slate-300 text-slate-600"
                onClick={() => setDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="btn-sm bg-rose-500 hover:bg-rose-600 text-white"
                onClick={()=>handleArticleDelete(copyArticle)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </ModalBlank>
    </>
  )
}
