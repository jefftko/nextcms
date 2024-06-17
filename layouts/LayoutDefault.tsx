import Loading from '@/components/ui/Loading'

import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import type { HeaderType } from '@/components/common/Header/data.d'
import jsonData from '@/data/global/index.json'
//import OverlayWrapper from '@/components/wrappers/OverlayWrapper'

interface Config {
  header: HeaderType
  footer: {
    // Define the structure similar to the header
  }
  theme: {
    // Define the structure
  }
}
export default function LayoutDefault({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header data={jsonData.header} />
      <main className="grow">{children}</main>
      <Footer />
    </>
  )
}
