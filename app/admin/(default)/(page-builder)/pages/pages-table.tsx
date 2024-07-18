'use client'

import { StaticImageData } from 'next/image'
import { useItemSelection } from '@/components/utils/use-item-selection'
import PagesTableItem from './pages-table-item'
import type { Pages } from 'contentlayer/generated'
import { useState } from 'react'
import ModalBasic from '@/components/admin/modal-basic'
import ModalBlank from '@/components/admin/modal-blank'
import request from '@/utils/request'
//import Toast from '@/components/admin/toast'
import { useMessage } from '@/app/admin/message-provider'
import { useAppProvider } from '@/app/admin/app-provider'
//import { useRouter,usePathname } from 'next/navigation'

const pageTitles = [
  'Title',
  'path',
  'layout',
  'home',
  'Status',
  'Created at',
  'Updated at',
  'Action',
]

export default function PagesTable({ pages, total }: { pages: Pages[]; total: number }) {
  const [isCopyModalOpen, setIsCopyModalOpen] = useState(false)
  const [copyPage, setCopyPage] = useState<Pages | null>(null)
  const { selectedItems, isAllSelected, handleCheckboxChange, handleSelectAllChange } =
    useItemSelection(pages)
  const { setToast } = useMessage()
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const { setLoading } = useAppProvider()

  const handlePageCopy = async (pageData) => {
    //检查所有页面的pagePath,保证唯一性
    for (const page of pages) {
      if (page.pagePath === copyPage?.pagePath) {
        console.log('pagePath重复')
        setIsCopyModalOpen(false)
        setToast({
          message: 'The path must be unique and cannot be changed once saved.',
          type: 'error',
        })
        return
      }
    }
    //keep fields from pageData
    const filterFields = [
      'title',
      'pagePath',
      'layout',
      'isDefault',
      'status',
      'blocks',
      'key',
      'description',
    ]
    const newData = Object.keys(pageData).reduce((acc, key) => {
      if (filterFields.includes(key)) {
        acc[key] = pageData[key]
      }
      return acc
    }, {})
    const postData = {
      ...newData,
      isDefault: false,
      lastmod: new Date().toISOString(),
      date: pageData?.date ?? new Date().toISOString(),
    }

    setLoading(true)
    setIsCopyModalOpen(false)

    const data = await request('/admin/api/page', {
      method: 'POST',
      body: JSON.stringify(postData),
    })
    setLoading(false)
    if (data) {
      if (data.status == 'success') {
        setToast({ message: 'Page copied successfully', type: 'success' })
      } else {
        setToast({ message: data.message, type: 'error' })
        console.error('Error saving MDX file:', data.message)
      }
    }
  }

  //delete page
  const handlePageDelete = async (pageData) => {
    setLoading(true)
    setDeleteModalOpen(false)
    //send page path to delete
    const data = await request('/admin/api/page', {
      method: 'DELETE',
      body: JSON.stringify({ pagePath: pageData.pagePath }),
    })
    setLoading(false)
    if (data) {
      if (data.status == 'success') {
        setToast({ message: 'Page deleted successfully', type: 'success' })
      } else {
        setToast({ message: data.message, type: 'error' })
        console.error('Error deleting MDX file:', data.message)
      }
    }
  }

  // set page to default page
  const handlePageDefault = async (pageData) => {
    // set default page is not default
    // if page status is unpublished, give a warning
    if (pageData.status === 'unpublished') {
      setToast({ message: 'Unpublished page cannot be set to default', type: 'error' })
      return
    }
    setLoading(true)
    const data = await request('/admin/api/page', {
      method: 'PUT',
      body: JSON.stringify({ ...pageData, isDefault: true }),
    })
    if (data) {
      if (data.status == 'success') {
        setToast({ message: 'Page set to default successfully', type: 'success' })
        //refresh page
        //get current page path
        //router.push(pathname)
      } else {
        setToast({ message: data.message, type: 'error' })
        console.error('Error setting default MDX file:', data.message)
      }
    }
    setLoading(false)
  }

  const handlePagePath = (path, data) => {
    //eslint-disable-next-line no-useless-escape
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    const newPath = path
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Correct: No change needed
      .replace(/[^\w-]+/g, '') // Remove unnecessary escape
      .replace(/--+/g, '-') // Remove unnecessary escape

    setCopyPage({ ...data, pagePath: newPath })
  }

  return (
    <>
      <div className="relative rounded-sm border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800">
        <header className="px-5 py-4">
          <h2 className="font-semibold text-slate-800 dark:text-slate-100">
            All Pages{' '}
            <span className="font-medium text-slate-400 dark:text-slate-500">{total}</span>
          </h2>
        </header>
        <div>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full table-auto divide-y divide-slate-200 dark:divide-slate-700 dark:text-slate-300">
              {/* Table header */}
              <thead className="border-t border-slate-200 bg-slate-50 text-xs uppercase text-slate-500 dark:border-slate-700 dark:bg-slate-900/20 dark:text-slate-400">
                <tr>
                  {pageTitles.map((title, index) => (
                    <th
                      className="whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5"
                      key={`th-${index}`}
                    >
                      <div className="text-left font-semibold">{title}</div>
                    </th>
                  ))}
                  <th className="whitespace-nowrap px-2 py-3 first:pl-5 last:pr-5">
                    <span className="sr-only">Menu</span>
                  </th>
                </tr>
              </thead>

              {pages.map((page, idx) => (
                <PagesTableItem
                  key={page.pagePath}
                  page={page}
                  onCheckboxChange={handleCheckboxChange}
                  isSelected={selectedItems.includes(idx)}
                  handleCopy={() => {
                    setCopyPage({ ...page, title: `${page.title} Copy`, pagePath: '' })
                    setIsCopyModalOpen(true)
                  }}
                  handleDelete={() => {
                    setCopyPage(page)
                    setDeleteModalOpen(true)
                  }}
                  handleDefault={() => {
                    handlePageDefault(page)
                  }}
                />
              ))}
            </table>

            <ModalBasic isOpen={isCopyModalOpen} setIsOpen={setIsCopyModalOpen} title="Copy Page">
              {/* Modal content */}
              <div className="px-5 py-4">
                <div className="text-sm">
                  <div className="mb-3 font-medium text-slate-800 dark:text-slate-100">
                    The path must be unique and cannot be changed once saved.
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="mb-1 block text-sm font-medium" htmlFor="title">
                      Title
                    </label>
                    <input
                      id="title"
                      value={copyPage?.title || ''}
                      className="form-input w-full px-2 py-1"
                      type="text"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium" htmlFor="name">
                      Page Path <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="path"
                      value={copyPage?.pagePath}
                      onChange={(e) => handlePagePath(e.target.value, copyPage)}
                      className="form-input w-full px-2 py-1"
                      type="text"
                      required
                    />
                  </div>
                </div>
              </div>
              {/* Modal footer */}
              <div className="border-t border-slate-200 px-5 py-4 dark:border-slate-700">
                <div className="flex flex-wrap justify-end space-x-2">
                  <button
                    className="btn-sm border-slate-200 text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-600"
                    onClick={() => {
                      setIsCopyModalOpen(false)
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handlePageCopy(copyPage)}
                    className="btn-sm bg-indigo-500 text-white hover:bg-indigo-600"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </ModalBasic>

            {/* Modal for Delete */}
            <ModalBlank isOpen={deleteModalOpen} setIsOpen={setDeleteModalOpen}>
              <div className="flex space-x-4 p-5">
                {/* Icon */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-500/30">
                  <svg className="h-4 w-4 shrink-0 fill-current text-rose-500" viewBox="0 0 16 16">
                    <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
                  </svg>
                </div>
                {/* Content */}
                <div>
                  {/* Modal header */}
                  <div className="mb-2">
                    <div className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                      Delete Page
                    </div>
                  </div>
                  {/* Modal content */}
                  <div className="mb-10 text-sm">
                    <div className="space-y-2">
                      <p>
                        Deleting a page is permanent and cannot be undone. Are you sure you want to
                        delete this page?
                      </p>
                    </div>
                  </div>
                  {/* Modal footer */}
                  <div className="flex flex-wrap justify-end space-x-2">
                    <button
                      className="btn-sm border-slate-200 text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-600"
                      onClick={() => {
                        setDeleteModalOpen(false)
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn-sm bg-rose-500 text-white hover:bg-rose-600"
                      onClick={() => handlePageDelete(copyPage)}
                    >
                      Yes, Delete it
                    </button>
                  </div>
                </div>
              </div>
            </ModalBlank>
          </div>
        </div>
      </div>
    </>
  )
}
