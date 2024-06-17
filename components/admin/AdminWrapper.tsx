'use client'

import React, { ReactNode, useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Header from '@/components/admin/common/header'
import Sidebar from '@/components/admin/common/sidebar'
import { getBreakpoint } from '../utils/utils'

interface Props {
  children: ReactNode
}

const AdminWrapper = ({ children }: Props) => {
  const [breakpoint, setBreakpoint] = useState<string | undefined>(getBreakpoint())
  const { data: session, status } = useSession()

  useEffect(() => {
    const handleBreakpoint = () => {
      setBreakpoint(getBreakpoint())
    }
    window.addEventListener('resize', handleBreakpoint)
    return () => {
      window.removeEventListener('resize', handleBreakpoint)
    }
  }, [breakpoint])
  if (status === 'loading') {
    return <div>Loading...</div>
  }
  return (
    <>
      {status === 'authenticated' && (breakpoint == 'lg' || breakpoint == 'xl') ? (
        <div className="flex h-[100dvh] overflow-hidden">
          <Sidebar />
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <Header />
            <main className="grow [&>*:first-child]:scroll-mt-16">{children}</main>
          </div>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  )
}

export default AdminWrapper
