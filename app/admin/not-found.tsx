import Link from 'next/link'
import Image from 'next/image'
import Sidebar from '@/components/admin/common/sidebar'
import { SessionProvider } from 'next-auth/react'

export default function NotFound() {
  return (
    <div className="flex h-[100dvh] overflow-hidden">
      {/* Sidebar */}
      <SessionProvider>
        <Sidebar />

        {/* Content area */}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <main className="grow [&>*:first-child]:scroll-mt-16">
            <div className="relative h-full bg-white dark:bg-slate-900">
              <div className="mx-auto w-full max-w-[96rem] px-4 py-8 sm:px-6 lg:px-8">
                <div className="m-auto mt-16 max-w-2xl">
                  <div className="px-4 text-center">
                    <div className="mb-8 inline-flex">
                      <Image
                        className="dark:hidden"
                        src="/admin/images/404-500.png"
                        width={400}
                        height={400}
                        alt="404 illustration"
                      />
                      <Image
                        className="hidden dark:block"
                        src="/admin/images/404-black-500.png"
                        width={400}
                        height={400}
                        alt="404 illustration dark"
                      />
                    </div>
                    <div className="mb-6">
                      Hmm...this page doesn't exist. Try searching for something else!
                    </div>
                    <Link
                      href="/admin"
                      className="btn bg-indigo-500 text-white hover:bg-indigo-600"
                    >
                      Back To Dashboard
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </SessionProvider>
    </div>
  )
}
