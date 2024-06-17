'use client'

import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'
// import json data
import jsonData from '@/data/global/index.json'

interface ContextProps {
  globalData: typeof jsonData
  showOverlay: boolean
  setShowOverlay: Dispatch<SetStateAction<boolean>>
}

const AppContext = createContext<ContextProps>({
  globalData: jsonData,
  showOverlay: false,
  setShowOverlay: (): boolean => false,
})

export default function AppProvider({ children }: { children: React.ReactNode }) {
  const [showOverlay, setShowOverlay] = useState<boolean>(false)
  const globalData = jsonData
  return (
    <AppContext.Provider value={{ showOverlay, setShowOverlay, globalData }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppProvider = () => useContext(AppContext)
