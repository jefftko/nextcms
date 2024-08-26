'use client'
import React, { useEffect, useState } from 'react'
import Accordion from '@/components/admin/accordion'
import { usePageData } from '@/app/admin/page-data'
import type { Pages } from 'contentlayer/generated'

export default function SeoForm() {
  const { pageData, setPageData } = usePageData()
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="relative mt-4">
      <Accordion title="SEO Settings"
       isEditing={isEditing}
      onItemClick={() => setIsEditing(!isEditing)}>
        {/* key */}
        <div className="relative mt-4">
          <label
            htmlFor="key"
            className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
          >
            Key
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="key"
              id="key"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Key for SEO"
              value={pageData?.key}
              onChange={(e) => setPageData({ ...(pageData as Pages), key: e.target.value })}
            />
          </div>
        </div>

        {/* description */}
        <div className="relative mt-4">
          <label
            htmlFor="description"
            className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
          >
            Description
          </label>
          <div className="mt-2">
            <textarea
              rows={4}
              name="description"
              id="description"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              value={pageData?.description}
              onChange={(e) => setPageData({ ...(pageData as Pages), description: e.target.value })}
            />
          </div>
        </div>
      </Accordion>
    </div>
  )
}
