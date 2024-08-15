import Loading from '@/components/ui/Loading'

import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import type { HeaderType } from '@/components/common/Header/data.d'
import { useAppProvider } from '@/app/app-provider'
//import OverlayWrapper from '@/components/wrappers/OverlayWrapper'

interface Config {
  header: HeaderType
  footer: {
    // Define the structure similar to the header
  }
}
export default function LayoutDefault({ children }: { children: React.ReactNode }) {
  const { globalData } = useAppProvider()

  return (
    <>
      <Header data={globalData['Header']} />
      <main className="grow">{children}</main>
      <Footer />
    </>
  )
}
