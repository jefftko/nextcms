import { auth } from 'auth'
import { redirect } from 'next/navigation'

export default async function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  if (!session) {
    redirect('/admin/signin')
  }

  return (
    <div>
      {/* Site header */}
      <main className="grow">{children}</main>
    </div>
  )
}
