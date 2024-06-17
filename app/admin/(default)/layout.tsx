'use client'
import Sidebar from '@/components/admin/common/sidebar'
import Header from '@/components/admin/common/header'
import { SessionProvider } from 'next-auth/react'

function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="flex h-[100dvh] overflow-hidden">
        <Sidebar />
        {/* Content area */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          <main className="grow">{children}</main>
        </div>
      </div>
    </SessionProvider>
  )
}

export default DefaultLayout
