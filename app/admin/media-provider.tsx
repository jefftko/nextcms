'use client'

import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'

interface ContextProps {
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  //filePath is an array of strings
  filePath: string[]
  setFilePath?: Dispatch<SetStateAction<string[]>>
}

const MediaContext = createContext<ContextProps>({
  loading: false,
  setLoading: (): boolean => false,
  filePath: [],
  setFilePath: (): string[] => [],
})

export default function MediaProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState<boolean>(false)
  const [filePath, setFilePath] = useState<string[]>([])
  return (
    <MediaContext.Provider value={{ loading, setLoading, filePath, setFilePath }}>
      {children}
    </MediaContext.Provider>
  )
}

export const useMediaProvider = () => useContext(MediaContext)
