import MediaPanel from './media-panel'
import MediaBody from './media-body'
import { handleLocalFiles } from '@/libs/fileHandler'

export default async function Media() {
  const files = await handleLocalFiles('images', '')

  return (
    <div className="relative mx-auto w-full max-w-[96rem] px-4 py-8 sm:px-6 lg:px-8">
      <MediaBody files={files} file_path={[]} />
      <MediaPanel />
    </div>
  )
}
