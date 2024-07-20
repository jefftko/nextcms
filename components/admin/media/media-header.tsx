'use client'
import CreateFolder from './create-folder'
//import Upload from './upload'
import UploadWithCrop from './upload-with-crop'
export default function MediaHeader() {
    const handleRefresh = () => {
    }
  return (
    <div className="mb-5 sm:flex sm:items-center sm:justify-between">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 md:text-3xl">
          Media Manager ✨
        </h1>
      </div>
      {/* Actions */}
      <div className="grid grid-flow-col justify-start gap-2 sm:auto-cols-max sm:justify-end">
        <CreateFolder />
        <UploadWithCrop />
      
      </div>
    </div>
  )
}
