'use client'

import { createContext, useContext, useState } from 'react'
import type { Pages } from 'contentlayer/generated'

interface PageDataProps {
  pageData: Pages | null
  setPageData: (pageData: Pages) => void
  action?: string
  blockId: string | null
  setBlockId: (blockId: string | null) => void
}

const PageData = createContext<PageDataProps | undefined>(undefined)

export const PageDataProvider = ({
  children,
  data,
  action = 'create',
}: {
  children: React.ReactNode
  data: Pages
  action: string
}) => {
  const [pageData, setPageData] = useState<Pages | null>(data)
  // set editing block and open block editor
  const [blockId, setBlockId] = useState<string | null>(null)

  return (
    <PageData.Provider value={{ pageData, setPageData, action, blockId, setBlockId }}>
      {children}
    </PageData.Provider>
  )
}

export const usePageData = () => {
  const context = useContext(PageData)
  if (!context) {
    throw new Error('usePageData must be used within a PageDataProvider')
  }
  return context
}
