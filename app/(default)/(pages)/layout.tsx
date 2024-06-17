'use client'
import { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { SessionProvider } from 'next-auth/react'

export default function PageLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 动态导入配置文件
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 700,
      easing: 'ease-out-cubic',
    })
  }) // 空依赖数组表示这个效果只在组件挂载时运行一次

  return (
    <>
      <SessionProvider>
        <main className="grow">{children}</main>
      </SessionProvider>
    </>
  )
}
