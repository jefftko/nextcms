import MediaManager from '@/components/admin/media/media-manager'
import MediaHeader from '@/components/admin/media/media-header'
import { FlyoutProvider } from '@/app/admin/flyout-context'
import MediaPanel from '../media-panel'
import MediaProvider from '@/app/admin/media-provider'
import { handleLocalFiles } from '@/libs/fileHandler'

export default async function Page({ params }: { params: { slug: string[] } }) {
  //flyoutOpen: boolean
  const slug = decodeURI(params.slug.join('/'))

  let files
  files = await handleLocalFiles('images', slug)

  return (
    <div className="relative mx-auto w-full max-w-[96rem] px-4 py-8 sm:px-6 lg:px-8">
      {/* Page header */}
      <FlyoutProvider>
        <MediaProvider filePath={params.slug}>
          <MediaHeader />
          <MediaManager data={files} />
          <MediaPanel />
        </MediaProvider>
      </FlyoutProvider>
    </div>
  )
}
