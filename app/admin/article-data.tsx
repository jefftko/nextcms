'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import type { Content } from 'contentlayer/generated'

interface ArticleDataContextType {
  articleData: Content
  setArticleData: React.Dispatch<React.SetStateAction<Content>>
  action: string
}

const ArticleDataContext = createContext<ArticleDataContextType | undefined>(undefined)

export function ArticleDataProvider({
  children,
  data,
  action,
}: {
  children: React.ReactNode
  data: Content
  action: string
}) {
  const [articleData, setArticleData] = useState<Content>(data)

  useEffect(() => {
    setArticleData(data)
  }, [data])

  return (
    <ArticleDataContext.Provider value={{ articleData, setArticleData, action }}>
      {children}
    </ArticleDataContext.Provider>
  )
}

export function useArticleData() {
  const context = useContext(ArticleDataContext)
  if (context === undefined) {
    throw new Error('useArticleData must be used within an ArticleDataProvider')
  }
  return context
}
