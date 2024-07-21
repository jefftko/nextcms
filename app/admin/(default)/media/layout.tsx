import MediaProvider from '@/app/admin/media-provider'
import { FlyoutProvider } from '@/app/admin/flyout-context'

function MediaLayout({ children }: { children: React.ReactNode }) {
  return (
    <FlyoutProvider>
      <MediaProvider>
        <div className="flex h-[100dvh] overflow-hidden">
          <main className="grow">{children}</main>
        </div>
      </MediaProvider>
    </FlyoutProvider>
  )
}

export default MediaLayout
