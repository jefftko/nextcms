import FileManager from '@/components/admin/file-manager'
import MediaManager from '@/components/admin/media/media-manager'
import MediaHeader from '@/components/admin/media/media-header'

export default async function Media() {
  //@ts-ignore - Disable TypeScript check for the next line

  return (
    <div className="mx-auto w-full max-w-[96rem] px-4 py-8 sm:px-6 lg:px-8">
      {/* Page header */}
     
      <MediaHeader />
      <MediaManager />

    </div>
  )
}
