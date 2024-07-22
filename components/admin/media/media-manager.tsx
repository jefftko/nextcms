'use client'

import React, { useState, useEffect } from 'react'
import { FolderIcon } from '@heroicons/react/20/solid'

export default function MediaManager({ data, file_path, onPathChange, onItemChange }) {
  const [files, setFiles] = useState(data)

  useEffect(() => {
    setFiles(data)
  }, [data])

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
                onClick={() => onPathChange(-1)}
              >
                {' '}
                Media{' '}
              </a>
            </li>
            {file_path?.map((item, index) => (
              <li
                className="after:px-2 after:text-slate-400 after:content-['/'] last:after:hidden dark:after:text-slate-600"
                key={index}
              >
                <a
                  className="text-slate-500 hover:text-indigo-500 dark:text-slate-400 dark:hover:text-indigo-500"
                  href="#0"
                  onClick={() => onPathChange(index)}
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
                    onClick={() => onItemChange(file)}
                  >
                    <span className="sr-only">View details for {file.title}</span>
                  </button>
                </div>
                <p className="pointer-events-none mt-2 block truncate text-center text-sm font-medium text-gray-900">
                  {file.title}
                </p>
                <p className="pointer-events-none block text-center text-sm font-medium text-gray-500">
                  {file.size}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="px-6 pb-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="text-center text-sm text-slate-500 dark:text-slate-400 sm:text-left">
            Showing{' '}
            <span className="font-medium text-slate-600 dark:text-slate-300">{files.length}</span>{' '}
            results
          </div>
        </div>
      </div>
    </div>
  )
}
