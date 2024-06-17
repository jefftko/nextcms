import './css/style.css'
import { Inter } from 'next/font/google'
import Theme from './theme-provider'
import AppProvider from './app-provider'
import { MessageProvider } from './message-provider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  title: 'NextCMS App',
  description: 'a cms system for Next',
}

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* suppressHydrationWarning: https://github.com/vercel/next.js/issues/44343 */}
      <body
        className={`${inter.variable} bg-slate-100 font-inter text-slate-600 antialiased dark:bg-slate-900 dark:text-slate-400`}
      >
        <Theme>
          <AppProvider>
            <MessageProvider>{children}</MessageProvider>
          </AppProvider>
        </Theme>
      </body>
    </html>
  )
}

export default RootLayout
