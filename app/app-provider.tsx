'use client'

import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'
// import json data
import jsonData from '@/data/global/index.json' assert { type: 'json' }

interface ContextProps {
  globalData: typeof jsonData
  setGlobalData: Dispatch<SetStateAction<typeof jsonData>>
  showOverlay: boolean
  setShowOverlay: Dispatch<SetStateAction<boolean>>
}

const AppContext = createContext<ContextProps>({
  globalData: jsonData,
  setGlobalData: (): typeof jsonData => jsonData,
  showOverlay: false,
  setShowOverlay: (): boolean => false,
})

export default function AppProvider({ children }: { children: React.ReactNode }) {
  const [showOverlay, setShowOverlay] = useState<boolean>(false)
  //const globalData = jsonData
  const [globalData, setGlobalData] = useState<typeof jsonData>(jsonData)
  return (
    <AppContext.Provider value={{ showOverlay, setShowOverlay, globalData, setGlobalData }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppProvider = () => useContext(AppContext)
