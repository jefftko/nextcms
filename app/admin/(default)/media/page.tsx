
import FileManager from '@/components/admin/file-manager'


export default async function Media() {
  //@ts-ignore - Disable TypeScript check for the next line

  return (
    <div className="mx-auto w-full max-w-[96rem] px-4 py-8 sm:px-6 lg:px-8">
      {/* Page header */}
      <div className="mb-5">
        {/* Title */}
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 md:text-3xl">
          Find the right blocks for you ✨
        </h1>
      </div>

      <FileManager />

    </div>
  )
}
