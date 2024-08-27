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

const DraggableItem = ({ id, index, moveItem, children, isEditing }) => {
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
    canDrag: !isEditing, // 禁用拖拽功能
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
  const [currentValue, setCurrentValue] = useState({id:null})

  const handleItemChange = useCallback((id, fieldName, fieldValue) => {
    setCurrentValue((prev) => ({
      ...prev,
      [fieldName]: fieldValue,
    }))
  }, [])
  //remove null or undefined values
  useEffect(() => {
    const cleanedList = listValue.filter((item) => item !== null && item !== undefined)
    if (cleanedList.length === 0) {
      setListValue([])
      return
    }
    console.log('cleanedList', cleanedList)
    setListValue([...cleanedList])
  }, [])

 useEffect(() => {
     if (Object.keys(currentValue).length === 0) {
         return
     }
     setListValue((prev) =>
        prev.map((item) => {
            if (item.id === currentValue.id) {
            return { ...item, ...currentValue }
            }
            return item
        })
    )
  }, [currentValue])

  useEffect(() => {
  if (listValue.length === 0) {
      //remove name
      setBlockData((prev) => {
        const { [name]: _, ...rest } = prev
        return rest
      })
  }else{
    setBlockData((prev) => ({
      ...prev,
      [name]: listValue,
    }))
  }
  }, [listValue])

  //退出时listValue为空
  useEffect(() => {
    return () => {
      setListValue([])
    }
  }, [])

  const addItem = () => {
    //if field kind includes list, remove it
    setListValue((prev) => [
      ...prev,
      {...Object.fromEntries(Object.keys(fields).map((key) => [key, fields[key].defaultValue || ''])),id: Math.random().toString(36).substring(7),isEditing:false}
    ])
  }

  /*const handleItemClick = (e, id) => {
      console.log('id', id)
      console.log(e)
      setListValue((prev) =>
                   prev.map((item) => {
                       if (item.id === id) {
                           if(e){
                               setCurrentValue(item)
                           }else{
                               //setCurrentValue({})
                           }
                           console.log('item', item)
                           return { ...item, isEditing: e }
                       }
                       return {...item, isEditing: false}
                   }))
     
  }*/

 const handleItemClick = (e, id) => {
     listValue.map((item) => {
         if (item.id === id) {
             if(e){
                 setCurrentValue(item)
             }else{
                 setCurrentValue({id:null})
             }
         }
     })
    
  }


  const removeItem = (id) => {
    const newList = listValue.filter((item) => item.id !== id)
    // delete index item
    console.log('newList', newList)
    // Filter out any potential null or undefined values
    if (newList.length === 0) {
      setListValue([])
      return
    }
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
                key={`${label}_${item.id || index}`}
                id={`${label}_${item.id || index}`}
                index={index}
                moveItem={moveItem}
                isEditing={currentValue.id}
              >
                <Accordion
                  title={`${item['name'] || item['title'] || item['label'] || item['id'] || index}`}
                  className="mt-2 truncate "
                  isEditing={currentValue.id === item.id}
                  onItemClick={(e) => handleItemClick(e, item.id)}
                >
                  <div key={index} className="mb-4 p-2">
                    <div className="flex flex-wrap justify-between">
                      {Object.keys(fields).map((fieldName, idx) => (
                        <BlockField
                          key={`${name}[${index}]_${fieldName}_${idx}`}
                          kind={fields[fieldName].kind == 'list' ? 'text' : fields[fieldName].kind}
                          label={fields[fieldName].label}
                          name={`${name}[${index}]_${fieldName}_${idx}`}
                          value={currentValue.id === item.id?currentValue[fieldName]:item[fieldName]}
                          onChange={(fieldValue) => handleItemChange(item.id, fieldName, fieldValue)}
                          additional={fields[fieldName].additional}
                        />
                      ))}
                      <button
                        className="btn mt-4 w-full border-slate-200 text-rose-500 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600"
                        onClick={() => removeItem(item.id)}
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
