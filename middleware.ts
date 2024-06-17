//export { auth as middleware } from "@/auth"

// Or like this if you need to do something here.
// export default auth((req) => {
//   console.log(req.auth) //  { session: { user: { ... } } }
// })
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher

import { auth } from '@/auth'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const legacyPrefixs = ['/admin']
export default auth((req) => {
  const { pathname } = req.nextUrl

  console.log('auth', req.auth)

  if (!req.auth?.user && pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/admin/signin', req.nextUrl).toString())
  }
  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api|_next/static|admin/signin|_next/image|favicon.ico).*)'],
}
