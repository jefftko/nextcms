import MediaManager from '@/components/admin/media/media-manager'
import MediaHeader from '@/components/admin/media/media-header'
import { FlyoutProvider } from '@/app/admin/flyout-context'
import { MediaDetailProvider } from './media-context'
import MediaPanel from './media-panel'

export default async function Media() {
  //@ts-ignore - Disable TypeScript check for the next line

  return (
    <div className="relative mx-auto w-full max-w-[96rem] px-4 py-8 sm:px-6 lg:px-8">
      {/* Page header */}
      <FlyoutProvider>
        <MediaHeader />
        <MediaManager />
        <MediaPanel />
      </FlyoutProvider>
    </div>
  )
}
