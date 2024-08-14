// components/admin/block-field/list-field.tsx

import React, { useRef, useState, useEffect, useCallback } from 'react'
import BlockField from './index'
import Accordion from '@/components/admin/accordion'
import { Icon } from '@/components/icons'
import { useBlockData } from '@/app/admin/block-data'
import { useDrag, useDrop, DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

interface DragItem {
  id: string
  index: number
}
const ItemTypes = {
  BLOCK: 'block',
}

const DraggableItem = ({ id, index, moveItem, children }) => {
  const ref = useRef(null)

  const [, drop] = useDrop<DragItem>({
    accept: ItemTypes.BLOCK,
    hover(item) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      moveItem(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.BLOCK,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref))

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {children}
    </div>
  )
}

const ListField = ({ label, name, fields, value }) => {
  const [listValue, setListValue] = useState(value || [])
  const { blockData, setBlockData } = useBlockData()
  const [currentValue, setCurrentValue] = useState({})
  const [currentIndex, setCurrentIndex] = useState(-1)

  const handleItemChange = useCallback((index, fieldName, fieldValue) => {
    setCurrentValue((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }))
  }, [])

  useEffect(() => {
    if (currentIndex >= 0) {
      listValue[currentIndex] = currentValue
      setListValue([...listValue])
    }
  }, [currentValue])

  useEffect(() => {
    if (currentIndex >= 0) {
      setCurrentValue(listValue[currentIndex])
    }
  }, [currentIndex, listValue])

  useEffect(() => {
    setBlockData((prev) => ({
      ...prev,
      [name]: listValue,
    }))
  }, [listValue])

  const addItem = () => {
    setListValue((prev) => [
      ...prev,
      Object.fromEntries(Object.keys(fields).map((key) => [key, fields[key].defaultValue || ''])),
    ])
  }

  const handleItemClick = (e, index) => {
    if (e) {
      setCurrentValue(listValue[index])
      setCurrentIndex(index)
    }
  }

  const removeItem = (index) => {
    const newList = listValue.filter((_, i) => i !== index)
    // delete index item
    console.log('newList', newList)

    setListValue([...newList])
  }

  const moveItem = (dragIndex, hoverIndex) => {
    const dragItem = listValue[dragIndex]
    const newList = [...listValue]
    newList.splice(dragIndex, 1)
    newList.splice(hoverIndex, 0, dragItem)
    setListValue(newList)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="mt-4 w-full">
        <div className="sm:flex sm:items-start sm:justify-between">
          <label className="mb-1 block text-sm font-medium">{label}</label>
          <button type="button" className="shrink-0 p-1.5" onClick={addItem}>
            <Icon kind="plus" size={5} viewBoxSize={24} />
            <div className="sr-only">Add Item</div>
          </button>
        </div>
        {listValue?.map(
          (item, index) =>
            item &&
            Object.keys(item).length > 0 && (
              <DraggableItem
                key={`${label}_${index}`}
                id={`${label}_${index}`}
                index={index}
                moveItem={moveItem}
              >
                <Accordion
                  title={`${label}_${index}_${item['name'] || item['title'] || item['label'] || item['id'] || index}`}
                  className="mt-2"
                  onItemClick={(e) => handleItemClick(e, index)}
                >
                  <div key={index} className="mb-4 p-2">
                    <div className="flex flex-wrap justify-between">
                      {Object.keys(fields).map((fieldName, idx) => (
                        <BlockField
                          key={`${name}[${index}]_${fieldName}_${idx}`}
                          kind={fields[fieldName].kind}
                          label={fields[fieldName].label}
                          name={`${name}[${index}]_${fieldName}_${idx}`}
                          value={item[fieldName] || ''}
                          onChange={(fieldValue) => handleItemChange(index, fieldName, fieldValue)}
                          additional={fields[fieldName].additional}
                        />
                      ))}
                      <button
                        className="btn mt-4 w-full border-slate-200 text-rose-500 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600"
                        onClick={() => removeItem(index)}
                      >
                        <Icon kind="trash" size={5} viewBoxSize={24} />
                        <span className="ml-2">Remove Item</span>
                      </button>
                    </div>
                  </div>
                </Accordion>
              </DraggableItem>
            )
        )}
      </div>
    </DndProvider>
  )
}

export default ListField
