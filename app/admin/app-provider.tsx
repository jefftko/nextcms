'use client'

import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'
// import json data
import jsonData from '@/data/global/admin.json' assert { type: 'json' }
import globalData from '@/data/global/index.json' assert { type: 'json' }

interface ContextProps {
  sidebarOpen: boolean
  setSidebarOpen: Dispatch<SetStateAction<boolean>>
  adminData: typeof jsonData
  setAdminData: Dispatch<SetStateAction<typeof jsonData>>
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  commonId: string | null
  setCommonId: (commonId: string | null) => void
  commonData: typeof globalData
  setCommonData: Dispatch<SetStateAction<typeof globalData>>
}

const AppContext = createContext<ContextProps>({
  sidebarOpen: false,
  setSidebarOpen: (): boolean => false,
  adminData: jsonData,
  setAdminData: (): typeof jsonData => jsonData,
  loading: false,
  setLoading: (): boolean => false,
  commonId: null,
  setCommonId: (): string | null => null,
  commonData: globalData,
  setCommonData: (): typeof globalData => globalData,
})

export default function AppProvider({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const [adminData, setAdminData] = useState<typeof jsonData>(jsonData)
  const [loading, setLoading] = useState<boolean>(false)
  const [commonId, setCommonId] = useState<string | null>(null)
  const [commonData, setCommonData] = useState<typeof globalData>(globalData)
  return (
    <AppContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
        adminData,
        setAdminData,
        loading,
        setLoading,
        commonId,
        setCommonId,
        commonData,
        setCommonData,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppProvider = () => useContext(AppContext)
