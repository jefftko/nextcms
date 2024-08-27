'use client'
import React, { useEffect, useState,useRef } from 'react'
import { useFlyoutContext } from '@/app/admin/flyout-context'
import { usePageData } from '@/app/admin/page-data'
import { useAppProvider } from '@/app/admin/app-provider'
import { useBlockData } from '@/app/admin/block-data'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Blocks from './blocks'
import BasicForm from './basic-form'
import SeoForm from './seo-form'
import { getBreakpoint } from '@/components/utils/utils'
import { Icon } from '@/components/icons'
import { LeftExpand, RightExpand } from '@/components/admin/atoms/icons'
//import BlockForm from './block-form'
const BlockForm = dynamic(() => import('./block-form'), { ssr: false })
const CommonForm = dynamic(() => import('./common-form'), { ssr: false })

export default function EditorSidebar() {
  const { flyoutOpen, setFlyoutOpen } = useFlyoutContext()
  const { pageData, setPageData, setBlockId, blockId } = usePageData()
  const { blockData, setBlockData } = useBlockData()
  const { commonId, setCommonId } = useAppProvider()
  const [panelWidth, setPanelWidth] = useState(320)
  const [startX, setStartX] = useState(0)
  const [startWidth, setStartWidth] = useState(0)

  const [isResizing, setIsResizing] = useState(false)
  const [screen, setScreen] = useState('md')
  const [isFullScreen, setIsFullScreen] = useState(false)
  const updateTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pageDataRef = useRef(pageData) // Store pageData in a ref
  const [blockType, setBlockType] = useState(null)

  const startResizing = (e) => {
    setStartX(e.clientX)
    setStartWidth(panelWidth)
    setIsResizing(true)
    e.preventDefault()
    console.log('startResizing')
  }

  const stopResizing = () => {
    setIsResizing(false)
  }

  const resizePanel = (e) => {
    if (isResizing && typeof window !== 'undefined') {
      e.preventDefault()
      console.log('proceed resizing')
      const editorContent = document.getElementById('editor-content')
      const leftPanel = document.querySelector('.left-panel')
      const newWidth = startWidth + e.clientX - startX
      const maxWidth = editorContent!.clientWidth * 0.5
      const minWidth = 320
      if (newWidth > minWidth && newWidth < maxWidth) {
        console.log('setPanelWidth')
        setPanelWidth(newWidth)
      }
    }
  }

  const handleFullScreen = () => {
    //计算出当前右侧面板的宽度
    //const rightPanel = document.querySelector('.right-panel')
    //get id  editor-content width
    const editorContent = document.getElementById('editor-content')
    const leftPanel = document.querySelector('.left-panel')
    if (!editorContent || !leftPanel) {
      console.error('Element not found')
      return
    }
    if (editorContent!.clientWidth - leftPanel!.clientWidth > 10) {
      setPanelWidth(editorContent!.clientWidth)
      setStartWidth(leftPanel!.clientWidth)
      setIsFullScreen(true)
    } else {
      setPanelWidth(startWidth)
      setIsFullScreen(false)
    }
  }

  useEffect(() => {
    // set screen size type
    if (typeof window !== 'undefined') {
      setScreen(getBreakpoint())
      const handleResize = () => {
        setScreen(getBreakpoint())
      }
      window.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])


  useEffect(() => {
    pageDataRef.current = pageData
  }, [pageData])

 // Update pageDataRef whenever pageData changes
  useEffect(() => {
    pageDataRef.current = pageData
    console.log('pageDataRef', pageData)
  }, [pageData])

 useEffect(() => {
    if(blockId == null) return
      //remove index from blockId
      console.log('blockForm', blockId)
      const block = pageDataRef.current?.blocks.find((block) => block.id === blockId)
      if (block) {
        setBlockData(block)
       if(block.type != blockType){
        setBlockType(block.type)
        }
      }else{
        console.log('block not found')
      }
  }, [blockId])




 useEffect(() => {
      console.log('blockData', blockData)
    if (blockData) {
     if (updateTimeout.current) {
        clearTimeout(updateTimeout.current)
      }
      updateTimeout.current = setTimeout(() => {
        //@ts-ignore
        setPageData((prev) => {
          const newBlocks = prev.blocks.map((block) => {
            if (block.id === blockId) {
              return blockData
            }
            return block
          })
          return { ...prev, blocks: newBlocks }
        })
      }, 200)
       
    }
  }, [blockData])



  return (
    <>
      <div
        id="editor-sidebar"
        className={`absolute bottom-0 top-16 z-20 -mr-px w-full transition-transform duration-200 ease-in-out md:static  md:bottom-auto md:top-auto md:w-auto md:translate-x-0`}
      >
        <div
          className={`left-panel no-scrollbar sticky top-16 h-[calc(100dvh)] shrink-0 overflow-hidden border-r border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900 `}
          style={{
            width: `${screen == 'sm' || screen == undefined ? window.innerWidth : panelWidth}px`,
          }}
        >
          {/* Group header */}
          {!blockId && (
            <div className="sticky top-0 z-10">
              <div className="flex h-16 items-center border-b border-slate-200 bg-white px-5 dark:border-slate-700 dark:bg-slate-900">
                <div className="flex w-full items-center justify-end">
                  {/* Edit button */}
                  <button className="ml-2 p-1.5" onClick={handleFullScreen}>
                    {isFullScreen ? <RightExpand /> : <LeftExpand />}
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Group body */}
          <div
            id="block-form"
            className={`absolute top-0 z-20 h-full w-full bg-white transition-transform duration-200 ease-in-out ${blockId ? 'translate-x-0' : '-translate-x-full'}`}
          >
            {/* Block form header */}
            <div className="flex h-16 items-center justify-between border-b border-slate-200 bg-slate-50 px-4 dark:border-slate-700 dark:bg-[#161F32] sm:px-6 md:px-5">
              {/* disable linting for this line */}
              {/* eslint-disable-next-line */}
              <button
                className="mr-4 text-slate-400 hover:text-slate-500"
                onClick={() => {
                    setBlockId(null)
                    setBlockData(null)
                }
                }
              >
                <span className="sr-only">Close block</span>
                <Icon kind="arrowLeft" className="shrink-0 opacity-50" size={6} />
              </button>
            </div>
            {/* Block form body */}
            <div className="max-h-[calc(100dvh-64px)] overflow-y-auto px-5 py-4">
              <BlockForm  blockType={blockType}/>
            </div>
          </div>

          {/* Common form */}
          <div
            id="common-form"
            className={`absolute top-0 z-20 h-full w-full bg-white transition-transform duration-200 ease-in-out ${commonId ? 'translate-x-0' : '-translate-x-full'}`}
          >
            {/* Block form header */}
            <div className="flex h-16 items-center justify-between border-b border-slate-200 bg-slate-50 px-4 dark:border-slate-700 dark:bg-[#161F32] sm:px-6 md:px-5">
              {/* disable linting for this line */}
              {/* eslint-disable-next-line */}
              <button
                className="mr-4 text-slate-400 hover:text-slate-500"
                onClick={() => setCommonId(null)}
              >
                <span className="sr-only">Close Common Block</span>
                <Icon kind="arrowLeft" className="shrink-0 opacity-50" size={6} />
              </button>
            </div>
            {/* Block form body */}
            <div className="max-h-[calc(100dvh-64px)] overflow-y-auto px-5 py-4">
              <CommonForm />
            </div>
          </div>
          {/* Common form */}

          <div className="flex flex-wrap justify-start px-5 py-4">
            {/* form */}
            <div className="w-full max-w-xl">
              <BasicForm />
            </div>
            <div className="w-full max-w-xl">
              <SeoForm />
            </div>
            <div className="w-full">
              <Blocks />
            </div>
          </div>
          {/* drag button for resize*/}
          {/* eslint-disable-next-line */}
          {!isFullScreen && (
            <div
              className="resizer absolute inset-y-0 right-0 z-50 flex cursor-ew-resize items-center px-2 max-md:hidden"
              onMouseDown={startResizing}
            >
              <div className="h-8 w-1.5 rounded-full bg-slate-400"></div>
            </div>
          )}
        </div>
      </div>
      {/* resize mask */}
      {isResizing && (
        <>
          {/* eslint-disable-next-line */}
          <div
            className="resize-mask fixed inset-0 z-50 cursor-ew-resize bg-black opacity-0"
            onMouseUp={stopResizing}
            onMouseMove={resizePanel}
          ></div>
        </>
      )}
    </>
  )
}
