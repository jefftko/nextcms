'use client'
import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { usePageData } from '@/app/admin/page-data'
import { Icon } from '@/components/icons'
import type { Pages } from 'contentlayer/generated'
import { useBlockData } from '@/app/admin/block-data'

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
const Block = ({ id, title, index, moveCard }) => {
  const ref = useRef(null)
  const { setBlockId } = usePageData()
  const { setBlockModalOpen } = useBlockData()

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

  return (
    <div
      ref={ref}
      className={`mt-2 rounded-sm border border-slate-200 bg-white p-4 shadow-lg ${isDragging ? 'opacity-50' : 'opacity-100'}`}
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
            <span className="ml-2 font-medium text-slate-800 dark:text-slate-100">{title}</span>
          </div>
        </div>

        {/* Right side for edit and delete icons */}
        <div className="flex items-center">
          {/* Edit button */}
          <button className="text-slate-400 hover:text-slate-600" onClick={() => setBlockId(id)}>
            <span className="sr-only">Edit</span>
            <Icon kind="edit" className="" size={8} />
          </button>
          {/* Delete button */}
          <button className="text-slate-400 hover:text-slate-600">
            <span className="sr-only">Delete</span>
            <Icon kind="trash" className="" size={8} />
          </button>
        </div>
      </div>
    </div>
  )
}

// Blocks 组件
export default function Blocks() {
  const { pageData, setPageData } = usePageData()
  const { setBlockModalOpen } = useBlockData()

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

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="mx-auto space-y-6">
        <div className="mt-4">
          <div className="mb-3 flex w-full items-center justify-between text-xs font-semibold uppercase text-slate-400 dark:text-slate-500">
            Blocks
            <button className="shrink-0 p-1.5" onClick={() => setBlockModalOpen(true)}>
              <Icon kind="plus" size={5} viewBoxSize={24} />
            </button>
          </div>
          <div className="space-y-2">
            {pageData?.blocks?.map((block, index) => (
              <Block
                key={`${block.id}`}
                id={`${block.id}`}
                title={block.title}
                index={index}
                moveCard={moveCard}
              />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  )
}
