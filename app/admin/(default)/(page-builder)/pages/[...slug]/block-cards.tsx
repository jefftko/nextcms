import Image from 'next/image'
import { usePageData } from '@/app/admin/page-data'
import type { Pages } from 'contentlayer/generated'

export default function BlockCards({ schemas }) {
  const { pageData, setPageData, setBlockId, blockId } = usePageData()
  const addBlock = (schema) => {
    console.log('add Block')
    let newBlock = {
      id: Math.random().toString(36).substring(7),
      name: schema.name,
      block_id: schema.id,
      type: schema.type,
    }
    //console.log(schema.fields)
    Object.keys(schema.fields).map((field) => {
      if (schema.fields[field].defaultValue) {
        newBlock[field] = schema.fields[field].defaultValue
      }
    })
    if (!pageData) return

    //console.log('newBlock', newBlock)

    setPageData({
      ...pageData,
      blocks: [...pageData.blocks, newBlock],
    })
  }

  return (
    <>
      {/* Card 4 */}
      {schemas.map((schema, index) => (
        <div
          className="col-span-6 overflow-hidden rounded-sm border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800"
          key={index}
        >
          <div className="flex h-full flex-col">
            {/* Image */}
            <Image
              className="w-full"
              src={schema?.thumbnail}
              width={286}
              height={160}
              alt={schema?.name}
            />
            {/* Card Content */}
            <div className="flex grow flex-col p-5">
              {/* Card body */}
              <div className="grow">
                {/* Header */}
                <header className="mb-3">
                  <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                    {schema?.name}
                  </h3>
                </header>
              </div>
              {/* Card footer */}
              <div>
                <button
                  className="btn-sm w-full bg-indigo-500 text-white hover:bg-indigo-600"
                  onClick={() => addBlock(schema)}
                >
                  <svg className="h-4 w-4 shrink-0 fill-current opacity-50" viewBox="0 0 16 16">
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="ml-2">Add Block</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
