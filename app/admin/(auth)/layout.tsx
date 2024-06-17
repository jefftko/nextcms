'use client'
import React from 'react'
import { SessionProvider } from 'next-auth/react'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SessionProvider>
        <main className="grow">{children}</main>
      </SessionProvider>
    </>
  )
}
