'use client'

import { createContext, useContext, useState } from 'react'

interface BlockDataProps {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  blockData: any
  setBlockData: (data) => void
  blockModalOpen: boolean
  setBlockModalOpen: (open: boolean) => void
}

const BlockData = createContext<BlockDataProps | undefined>(undefined)

export const BlockDataProvider = ({
  children,
  data = null,
}: {
  children: React.ReactNode
  /* eslint-disable @typescript-eslint/no-explicit-any */
  data?: any
}) => {
  const [blockData, setBlockData] = useState(data)
  const [blockModalOpen, setBlockModalOpen] = useState(false)
  // set editing block and open block editor

  return (
    <BlockData.Provider value={{ blockData, setBlockData, blockModalOpen, setBlockModalOpen }}>
      {children}
    </BlockData.Provider>
  )
}

export const useBlockData = () => {
  const context = useContext(BlockData)
  if (!context) {
    throw new Error('usePageData must be used within a PageDataProvider')
  }
  return context
}
