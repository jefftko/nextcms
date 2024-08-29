'use client'
import React, { useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { usePageData } from '@/app/admin/page-data'
import { Icon } from '@/components/icons'
import type { Pages } from 'contentlayer/generated'
import { useBlockData } from '@/app/admin/block-data'
import ModalBlank from '@/components/admin/modal-blank'

const ItemTypes = {
  BLOCK: 'block',
}

interface DragItem {
  id: string
  index: number
}

interface DropCollectedProps {
  isOver: boolean
  canDrop: boolean
}

// 定义 Block 组件
const Block = ({ id, title, index, moveCard, deleteBlock, setBlock }) => {
  const ref = useRef(null)
  //const { setBlockId, pageData, setPageData } = usePageData()
  //const { setBlockModalOpen, setBlockData,blockData } = useBlockData()

  const [, drop] = useDrop<DragItem, void, DropCollectedProps>({
    accept: ItemTypes.BLOCK,
    drop(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      moveCard(dragIndex, hoverIndex)

      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.BLOCK,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  drag(drop(ref))

  //remove block
  const handleBlockDelete = (id) => {
    /*const blocks = pageData.blocks
    const newBlocks = blocks.filter((block) => block.id !== id)
    setPageData({
      ...pageData,
      blocks: newBlocks,
    })*/
    deleteBlock(id)
  }

  return (
    <div
      ref={ref}
      className={`mt-2 rounded-sm border border-slate-200 bg-white px-4 py-2 shadow-lg ${isDragging ? 'opacity-50' : 'opacity-100'}`}
    >
      <div className="sm:flex sm:items-start sm:justify-between">
        {/* Left side */}
        <div className="mb-3 mt-0.5 grow space-y-3 sm:mb-0">
          <div className="flex items-center">
            {/* Drag button */}
            <button className="mr-2 cursor-move">
              <span className="sr-only">Drag</span>
              <svg
                className="h-3 w-3 fill-slate-300 dark:fill-slate-600"
                viewBox="0 0 12 12"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 1h12v2H0V1Zm0 4h12v2H0V5Zm0 4h12v2H0V9Z" fillRule="evenodd" />
              </svg>
            </button>
            <span className="ml-2 w-40 truncate text-base font-medium text-slate-800 dark:text-slate-100">
              {title}
            </span>
          </div>
        </div>

        {/* Right side for edit and delete icons */}
        <div className="flex items-center">
          {/* Edit button */}
          <button
            className="text-slate-400 hover:text-slate-600"
            onClick={() => {
              //setBlockData
              setBlock(id)
            }}
          >
            <span className="sr-only">Edit</span>
            <Icon kind="edit" className="" size={6} />
          </button>
          {/* Delete button */}
          <button
            className="text-slate-400 hover:text-slate-600"
            onClick={() => handleBlockDelete(id)}
          >
            <span className="sr-only">Delete</span>
            <Icon kind="trash" className="" size={6} />
          </button>
        </div>
      </div>
    </div>
  )
}

// Blocks 组件
export default function Blocks() {
  const { pageData, setPageData, setBlockId } = usePageData()
  const { setBlockModalOpen, setBlockData } = useBlockData()
  const [dangerModalOpen, setDangerModalOpen] = useState<boolean>(false)
  const [bid, setBid] = useState<string | null>(null)

  const moveCard = (dragIndex, hoverIndex) => {
    if (dragIndex !== hoverIndex) {
      const dragCard = pageData?.blocks[dragIndex]
      const blocks = pageData?.blocks || []
      const newBlocks = [...blocks]
      newBlocks.splice(dragIndex, 1)
      newBlocks.splice(hoverIndex, 0, dragCard)

      setPageData({
        ...(pageData as Pages),
        blocks: newBlocks,
      })
    }
  }
  const handleBlockDelete = (id) => {
    setDangerModalOpen(true)
    setBid(id)
  }
  const onDeleteBlock = (id) => {
    if (!id || !pageData) return
    const blocks = pageData?.blocks
    const newBlocks = blocks.filter((block) => block.id !== id)
    setPageData({
      ...pageData,
      blocks: newBlocks,
    })
    setDangerModalOpen(false)
  }

  const handleSetBlock = (id) => {
    const block = pageData?.blocks.find((block) => block.id === id)
    if (block) {
      setBlockData(block)
      setBlockId(id)
    }
  }

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className="mx-auto space-y-6">
          <div className="mt-4">
            <div className="mb-3 flex w-full items-center justify-between text-xs font-semibold uppercase text-slate-400 dark:text-slate-500">
              Blocks
              <button className="shrink-0 p-1.5" onClick={() => setBlockModalOpen(true)}>
                <Icon kind="plus" size={5} viewBoxSize={24} />
              </button>
            </div>
            <div className="max-h-[420px] space-y-2 overflow-y-auto">
              {pageData?.blocks?.map((block, index) => (
                <Block
                  key={`${block.id}`}
                  id={`${block.id}`}
                  title={block.title}
                  index={index}
                  moveCard={moveCard}
                  deleteBlock={handleBlockDelete}
                  setBlock={handleSetBlock}
                />
              ))}
            </div>
          </div>
        </div>
      </DndProvider>
      {/* Delete Modal */}
      <div className="m-1.5">
        {/* Start */}
        <ModalBlank isOpen={dangerModalOpen} setIsOpen={setDangerModalOpen}>
          <div className="flex space-x-4 p-5">
            {/* Icon */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-500/30">
              <svg className="h-4 w-4 shrink-0 fill-current text-rose-500" viewBox="0 0 16 16">
                <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
              </svg>
            </div>
            {/* Content */}
            <div>
              {/* Modal header */}
              <div className="mb-2">
                <div className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                  Delete this block?
                </div>
              </div>
              {/* Modal content */}
              <div className="mb-10 text-sm">
                <div className="space-y-2">
                  <p>Are you sure you want to delete this block? This action cannot be undone.</p>
                </div>
              </div>
              {/* Modal footer */}
              <div className="flex flex-wrap justify-end space-x-2">
                <button
                  className="btn-sm border-slate-200 text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-600"
                  onClick={() => {
                    setDangerModalOpen(false)
                  }}
                >
                  Cancel
                </button>
                <button
                  className="btn-sm bg-rose-500 text-white hover:bg-rose-600"
                  onClick={() => onDeleteBlock(bid)}
                >
                  Yes, Delete it
                </button>
              </div>
            </div>
          </div>
        </ModalBlank>
        {/* End */}
      </div>
    </>
  )
}
