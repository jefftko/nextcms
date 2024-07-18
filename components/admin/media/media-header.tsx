'use client'
import CreateFolder from './create-folder'
import { useRouter } from 'next/navigation'
export default function MediaHeader() {
    const router = useRouter()
    const handleRefresh = () => {
        console.log(router)
        router.fastRefresh()
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
        <button className="btn bg-indigo-500 text-white hover:bg-indigo-600">
          <svg className="h-4 w-4 shrink-0 fill-current opacity-50" viewBox="0 0 16 16">
            <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
          </svg>
          <span className="ml-2 hidden sm:block" onClick={handleRefresh}>Upload</span>
        </button>
      </div>
    </div>
  )
}
