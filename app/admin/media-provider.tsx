'use client'

import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react'

interface ContextProps {
  loading: boolean
  setLoading: Dispatch<SetStateAction<boolean>>
  //filePath is an array of strings
  filePath: string[]
}

const MediaContext = createContext<ContextProps>({
  loading: false,
  setLoading: (): boolean => false,
  filePath: [],
})

export default function MediaProvider({
  children,
  filePath,
}: {
  children: React.ReactNode
  filePath: string[]
}) {
  const [loading, setLoading] = useState<boolean>(false)
  return (
    <MediaContext.Provider value={{ loading, setLoading, filePath }}>
      {children}
    </MediaContext.Provider>
  )
}

export const useMediaProvider = () => useContext(MediaContext)
