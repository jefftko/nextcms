'use client'
import React, { useEffect, useState } from 'react'
import { Icon } from '@/components/icons'
import Accordion from '@/components/admin/accordion'
import DropdownFull from '@/components/admin/dropdown-full'
import { usePageData } from '@/app/admin/page-data'
import Tooltip from '@/components/admin/tooltip'
import { Pages } from 'contentlayer/generated'

export default function BasicForm() {
  //定义pageData的类型
  const { pageData, setPageData, action } = usePageData()
  const [layoutOptions, setLayoutOptions] = useState([{ id: 0, key: 'default', value: 'Default' }])
  const [isEditing, setIsEditing] = useState(false)

  const handlePagePath = (path) => {
    //eslint-disable-next-line no-useless-escape
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    const newPath = path
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Correct: No change needed
      .replace(/[^\w-]+/g, '') // Remove unnecessary escape
      .replace(/--+/g, '-') // Remove unnecessary escape
    setPageData({ ...(pageData as Pages), pagePath: newPath })
  }

  /* change status */

  return (
    <div className="relative mt-4">
      <Accordion
        title="Basic Settings"
        isEditing={isEditing}
        onItemClick={() => setIsEditing(!isEditing)}
      >
        {/* alias for url path */}
        <div className="relative mt-2">
          <div className="flex items-center justify-between">
            <label className="mb-1 ml-2 block text-xs font-medium" htmlFor="pagePath">
              Path <span className="text-rose-500">*</span>
            </label>
            <Tooltip className="ml-2" size="md" position="left">
              <div className="text-sm">
                Page path must be unique and used as both a URL path and a file name, It should
                start with a letter, and only include lowercase letters, numbers, and hyphens.
              </div>
            </Tooltip>
          </div>
          <div className="mt-0">
            <input
              type="text"
              name="pagePath"
              id="pagePath"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="for example: about-us"
              value={pageData?.pagePath}
              onChange={(e) => handlePagePath(e.target.value)}
              required
              disabled={action === 'edit'}
              readOnly={action === 'edit'}
            />
          </div>
        </div>

        {/* title */}
        <div className="relative mt-4">
          <label
            htmlFor="title"
            className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
          >
            Title
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="title"
              id="title"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Title for the page"
              value={pageData?.title}
              onChange={(e) => setPageData({ ...(pageData as Pages), title: e.target.value })}
            />
          </div>
        </div>
        {/* Select layout */}
        <div className="relative mt-4">
          <label
            htmlFor="layout"
            className="absolute -top-2 left-2 z-10 inline-block bg-white px-1 text-xs font-medium text-gray-900"
          >
            Layout
          </label>
          <div className="mt-2">
            <DropdownFull
              options={layoutOptions}
              value={pageData?.layout ?? 'default'}
              setValue={(e) => setPageData({ ...(pageData as Pages), layout: e })}
            />
          </div>
        </div>

        {/* status */}
        <div className="relative mt-4">
          <label
            htmlFor="switch-3"
            className="mb-2 inline-block bg-white px-1 px-2 text-xs font-medium text-gray-900"
          >
            Status
          </label>

          {/* Start */}
          <div className="flex items-center px-1">
            <div className="form-switch">
              <input
                type="checkbox"
                id="switch-3"
                className="sr-only"
                checked={pageData?.status === 'published'}
                onChange={() =>
                  setPageData({
                    ...(pageData as Pages),
                    status: pageData?.status == 'published' ? 'unpublished' : 'published',
                  })
                }
              />
              <label className="bg-slate-400 dark:bg-slate-700" htmlFor="switch-3">
                <span className="bg-white shadow-sm" aria-hidden="true"></span>
                <span className="sr-only">Status</span>
              </label>
            </div>
            <div className="ml-2 text-sm italic text-slate-400 dark:text-slate-500">
              {pageData?.status === 'published' ? 'Published' : 'Unpublished'}
            </div>
          </div>
          {/* End */}
        </div>
      </Accordion>
    </div>
  )
}
