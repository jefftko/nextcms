'use client'
import { useState } from 'react'
import { useFlyoutContext } from '@/app/admin/flyout-context'
import Image from 'next/image'
import { Icon } from '@/components/icons'
import { usePageData } from '@/app/admin/page-data'
import { useAppProvider } from '@/app/admin/app-provider'
import { useMessage } from '@/app/admin/message-provider'
import { editPage, createPage } from '@/services/pageBuilderService'

interface HeaderProps {
  setWidth: (width: string) => void
}

export default function EditorHeader({ setWidth }: HeaderProps) {
  const { flyoutOpen, setFlyoutOpen } = useFlyoutContext()
  const { sidebarOpen, setSidebarOpen } = useAppProvider()
  const [isMobile, setIsMobile] = useState(false)
  const { pageData, action } = usePageData()
  const { setToast } = useMessage()

  //const { title,pageName,status,blocks,layout,key,description } = pageData??{}
  //remove other data from pageData
  //if date is null set date to now
  const handleSave = async () => {
    console.log('Saving MDX file...')
    //do not include other data
    const data = {
      title: pageData?.title,
      pagePath: pageData?.pagePath,
      isDefault: pageData?.isDefault,
      status: pageData?.status,
      blocks: pageData?.blocks,
      layout: pageData?.layout,
      key: pageData?.key,
      description: pageData?.description,
      date: pageData?.date,
    }
    /*fetch('/admin/api/file', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        lastmod: new Date().toISOString(),
        date: data?.date ?? new Date().toISOString(),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message)
      })
      .catch((error) => {
        console.error('Error saving MDX file:', error)
      })*/
    //if blocks is empty ,return error
    if (!pageData?.blocks || pageData?.blocks.length === 0) {
      setToast({ message: 'Blocks cannot be empty', type: 'error' })
      return
    }
    try {
      let resData
      if (action === 'edit') {
        resData = await editPage(data)
      } else {
        resData = await createPage(data)
      }
      if (resData) {
        if (resData.status == 'success') {
          setToast({ message: 'Page saved successfully', type: 'success' })
          //if page is new ,redirect to edit page
          if (action === 'create') {
            //window.location.href = `/admin/pages/edit/${pageData.pagePath}`
            window.location.href = `/admin/pages`
            //redirect(`/admin/pages/edit/${pageData.pagePath}`)
          }
          //reload page
        } else {
          setToast({ message: resData.message, type: 'error' })
          console.error('Error saving MDX file:', resData.message)
        }
      }
    } catch (error) {
      setToast({ message: 'Error saving MDX file', type: 'error' })
      console.error('Error saving MDX file:', error)
    }
    return
  }

  //handle desktop or mobile
  const handleSetMobile = (type) => {
    setIsMobile(type)
    if (type) {
      setWidth('mobile')
    } else {
      setWidth('desktop')
    }
  }

  return (
    <div className="sticky top-0 z-30">
      <div className="flex h-16 items-center justify-between border-b border-slate-200 bg-slate-50 px-4 dark:border-slate-700 dark:bg-[#161F32] sm:px-6 md:px-5">
        {/* People */}
        <div className="flex flex-1 items-center">
          {/* Close button */}
          {/*<button
           className="mr-4 text-slate-400 hover:text-slate-500 md:hidden"
           onClick={() => setFlyoutOpen(!flyoutOpen)}
           aria-controls="messages-sidebar"
           aria-expanded={flyoutOpen}
           >
           <span className="sr-only">Close sidebar</span>
           <Icon kind="arrowLeft" className="shrink-0 opacity-50" size={6} />
           </button>*/}

          <button
            className="text-slate-500 hover:text-slate-600 lg:hidden"
            onClick={() => {
              setSidebarOpen(!sidebarOpen)
            }}
          >
            <span className="sr-only">Open sidebar</span>
            <svg
              className="h-6 w-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="4" y="5" width="16" height="2" />
              <rect x="4" y="11" width="16" height="2" />
              <rect x="4" y="17" width="16" height="2" />
            </svg>
          </button>
          {/* People list */}
          <div className="-ml-px flex -space-x-3"></div>
        </div>
        {/* choose pc or mobile */}
        <div className="hidden items-center space-x-1 rounded-lg bg-slate-100 p-0.5 md:flex">
          <button
            className={`flex items-center rounded-md py-[0.4375rem] pl-2 pr-2 text-sm font-semibold lg:pr-3 ${isMobile ? '' : 'bg-white shadow'}`}
            title="Desktop"
            onClick={() => handleSetMobile(false)}
          >
            <span className="sr-only">Desktop</span>
            {/* SVG content here */}
            <svg
              className="h-6 w-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
            >
              <path d="M10 27v-2h12v2z"></path>
              <path d="M6 7v14h20V7H6zm22-2v18H4V5h24z"></path>
            </svg>
          </button>
          <button
            className={`flex items-center rounded-md py-[0.4375rem] pl-2 pr-2 text-sm font-semibold lg:pr-3 ${isMobile ? 'bg-white shadow' : ''}`}
            title="Mobile"
            onClick={() => handleSetMobile(true)}
          >
            <span className="sr-only">Mobile</span>
            {/* SVG content here */}
            <svg
              className="h-6 w-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
            >
              <path d="M13 24v2H6a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v9h-2V6H6v18h7z"></path>
              <path d="M17 15v11h9V15h-9zm0-2h9a2 2 0 012 2v11a2 2 0 01-2 2h-9a2 2 0 01-2-2V15a2 2 0 012-2z"></path>
            </svg>
          </button>
        </div>

        {/* Buttons on the right side */}
        <div className="flex flex-1 justify-end">
          <button className="btn bg-indigo-500 text-white hover:bg-indigo-600" onClick={handleSave}>
            <Icon kind="check" className="shrink-0 opacity-50" size={4} />

            <span className="ml-2 hidden sm:block">Save</span>
          </button>
        </div>
      </div>
    </div>
  )
}
