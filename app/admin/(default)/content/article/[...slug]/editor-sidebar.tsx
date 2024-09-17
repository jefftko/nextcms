'use client'

import { useState, useEffect } from 'react'
import { useArticleData } from '@/app/admin/article-data'

export default function EditorSidebar() {
  const { articleData, setArticleData } = useArticleData()

  const handlePropertyChange = (property: string, value: string) => {
    setArticleData({ ...articleData, [property]: value })
  }

  return (
    <div className="w-64 bg-white p-4 border-r">
      <h2 className="text-lg font-semibold mb-4">Article Properties</h2>
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
  )
}
