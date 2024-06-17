import { Inter } from 'next/font/google'
import SectionContainer from './SectionContainer'
import Footer from '@/components/common/Footer'
import { ReactNode } from 'react'
import Header from '@/components/common/Header'
import global from '@/data/global/index.json' assert { type: 'json' }

interface Props {
  children: ReactNode
}

const inter = Inter({
  subsets: ['latin'],
})

const LayoutWrapper = ({ children }: Props) => {
  return (
    <SectionContainer>
      <div className={`${inter.className} flex h-screen flex-col justify-between font-sans`}>
        <Header data={global.header} />
        <main className="mb-auto">{children}</main>
        <Footer />
      </div>
    </SectionContainer>
  )
}

export default LayoutWrapper
