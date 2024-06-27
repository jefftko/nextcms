


export default function MediaHeader() {
  return (
       <div className="mb-5 sm:flex sm:justify-between sm:items-center">
        {/* Title */}
        <div>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 md:text-3xl">
          Media Manager ✨
        </h1>
        </div>
        {/* Actions */}
         <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
        <button className="btn btn-primary">Upload</button>
         <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white">
            <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="hidden sm:block ml-2">Upload</span>
         </button>
        </div>
      </div>
  )
}


