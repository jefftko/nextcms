'use client'

import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'
// import json data
import jsonData from '@/data/global/admin.json'

interface ContextProps {
  sidebarOpen: boolean
  setSidebarOpen: Dispatch<SetStateAction<boolean>>
  adminData: typeof jsonData
  setAdminData: Dispatch<SetStateAction<typeof jsonData>>
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
}

const AppContext = createContext<ContextProps>({
  sidebarOpen: false,
  setSidebarOpen: (): boolean => false,
  adminData: jsonData,
  setAdminData: (): typeof jsonData => jsonData,
  loading: false,
  setLoading: (): boolean => false,
})

export default function AppProvider({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const [adminData, setAdminData] = useState<typeof jsonData>(jsonData)
  const [loading, setLoading] = useState<boolean>(false)
  return (
    <AppContext.Provider
      value={{ sidebarOpen, setSidebarOpen, adminData, setAdminData, loading, setLoading }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppProvider = () => useContext(AppContext)
