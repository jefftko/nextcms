export const metadata = {
  title: 'Blocks',
  description: 'Page description',
}

import ShopCards02 from '../../shop-cards-02'

export default async function Pages() {
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

      {/* Filters */}
      <div className="mb-4 border-b border-slate-200 dark:border-slate-700">
        <ul className="no-scrollbar -mx-4 flex flex-nowrap overflow-x-scroll text-sm font-medium sm:-mx-6 lg:-mx-8">
          <li className="mr-6 pb-3 first:pl-4 last:mr-0 last:pr-4 sm:first:pl-6 sm:last:pr-6 lg:first:pl-8 lg:last:pr-8">
            <a className="whitespace-nowrap text-indigo-500" href="#0">
              Local Blocks
            </a>
          </li>
          <li className="mr-6 pb-3 first:pl-4 last:mr-0 last:pr-4 sm:first:pl-6 sm:last:pr-6 lg:first:pl-8 lg:last:pr-8">
            <a
              className="whitespace-nowrap text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
              href="#0"
            >
              Market Blocks
            </a>
          </li>
          {/*<li className="pb-3 mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8">
            <a className="text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 whitespace-nowrap" href="#0">My Clolud Blocks</a>
          </li>
          <li className="pb-3 mr-6 last:mr-0 first:pl-4 sm:first:pl-6 lg:first:pl-8 last:pr-4 sm:last:pr-6 lg:last:pr-8">
            <a className="text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 whitespace-nowrap" href="#0">Market Blocks</a>
          </li>*/}
        </ul>
      </div>

      {/* Page content */}
      <div>
        {/* Cards 2 (Digital Goods) */}
        <div className="mt-8">
          <h2 className="mb-5 text-xl font-bold leading-snug text-slate-800 dark:text-slate-100">
            Block
          </h2>
          <div className="grid grid-cols-12 gap-6">
            <ShopCards02 />
          </div>
        </div>
      </div>
    </div>
  )
}
