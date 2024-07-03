'use client'
import PaginationClassic from '@/components/admin/pagination-classic'
import { getFiles } from '@/services/fileService'
import React, { useState, useEffect } from 'react'
import { FolderIcon, PhotographIcon } from '@heroicons/react/20/solid'
import { useFlyoutContext } from '@/app/admin/flyout-context'

export default function MediaManager() {
  const [files, setFiles] = useState([])
  const [filePath, setFilePath] = useState([])

  const { setFlyoutOpen } = useFlyoutContext()

  const fetchFiles = async (query) => {
    const data = await getFiles(query)
    setFiles(data)
  }

  const handleImage = (e) => {
    if (e.type === 'directory') {
      //split with source ,but remove empty string
      setFilePath(e.source.split('/').filter(Boolean))
    } else {
      setFlyoutOpen(true)
    }
  }

  const handlePath = (index) => {
    setFilePath(filePath.slice(0, index + 1))
  }

  useEffect(() => {
    const query = { type: 'images', source: 'local', filePath: filePath.join('/') }
    fetchFiles(query)
  }, [filePath])
  return (
    <div className="relative rounded-sm border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800">
      <header className="px-5 py-4">
        <div className="text-left">
          {/* Start */}
          <ul className="inline-flex flex-wrap text-sm font-medium">
            <li className="after:px-2 after:text-slate-400 after:content-['/'] last:after:hidden dark:after:text-slate-600">
              <a
                className="text-slate-500 hover:text-indigo-500 dark:text-slate-400 dark:hover:text-indigo-500"
                href="#0"
                onClick={() => setFilePath([])}
              >
                {' '}
                Media{' '}
              </a>
            </li>
            {filePath.map((item, index) => (
              <li className="after:px-2 after:text-slate-400 after:content-['/'] last:after:hidden dark:after:text-slate-600">
                <a
                  className="text-slate-500 hover:text-indigo-500 dark:text-slate-400 dark:hover:text-indigo-500"
                  href="#0"
                  onClick={() => handlePath(index)}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
          {/* End */}
        </div>
      </header>
      <div>
        {/* Table */}
        <div className="overflow-x-auto">
          <ul
            role="list"
            className="grid grid-cols-2 gap-x-4 gap-y-8 p-5 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
          >
            {files.map((file) => (
              <li key={file.source} className="relative">
                <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                  {file.type === 'directory' ? (
                    <FolderIcon className="pointer-events-none object-cover text-yellow-500 group-hover:opacity-75" />
                  ) : (
                    <img
                      src={file.source}
                      alt=""
                      className="pointer-events-none object-contain object-scale-down group-hover:opacity-75"
                    />
                  )}
                  <button
                    type="button"
                    className="absolute inset-0 focus:outline-none"
                    onClick={() => handleImage(file)}
                  >
                    <span className="sr-only">View details for {file.title}</span>
                  </button>
                </div>
                <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
                  {file.title}
                </p>
                <p className="pointer-events-none block text-sm font-medium text-gray-500">
                  {file.size}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="px-6 pb-5">
        <PaginationClassic total={files.length} currentPage={1} perPage={4} />
      </div>
    </div>
  )
}
