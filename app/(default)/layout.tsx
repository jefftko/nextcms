import 'css/style.css'
import 'pliny/search/algolia.css'

import { Analytics, AnalyticsConfig } from 'pliny/analytics'
import { SearchProvider, SearchConfig } from 'pliny/search'
import siteMetadata from '@/data/siteMetadata'
import { ThemeProviders } from './theme-providers'
import { Metadata } from 'next'
import AppProvider from './app-provider'

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  //console.log(global.header)
  //favicon generator: https://realfavicongenerator.net/

  return (
    <html lang={siteMetadata.language} suppressHydrationWarning>
      <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
      <link rel="manifest" href="/favicons/site.webmanifest" />
      <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <body className={`bg-white tracking-tight text-gray-900 antialiased`}>
        <ThemeProviders>
          <AppProvider>
            <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
            <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
              {/*<SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
                {children}
              </SearchProvider>*/}
              {children}
            </div>
          </AppProvider>
        </ThemeProviders>
      </body>
    </html>
  )
}
