// components/admin/block-field/menu-field.tsx

import React, { useState, useEffect, useCallback } from 'react'
import Accordion from '@/components/admin/accordion'
import { Icon } from '@/components/icons'
import { useDrag, useDrop, DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

interface MenuItem {
  id: string
  label: string
  href: string
  children?: MenuItem[]
}

interface DragItem {
  id: string
  index: number
}

const ItemTypes = {
  MENU: 'menu',
}

const DraggableItem = ({ id, index, moveItem, children }) => {
  const ref = React.useRef(null)

  const [, drop] = useDrop<DragItem>({
    accept: ItemTypes.MENU,
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
    type: ItemTypes.MENU,
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

const MenuField = ({ label, name, value, onChange }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(value || [])

  const handleItemChange = (index, fieldName, fieldValue) => {
    const newItems = [...menuItems]
    newItems[index] = {
      ...newItems[index],
      [fieldName]: fieldValue,
    }
    setMenuItems(newItems)
    onChange(newItems)
  }

  const addItem = () => {
    setMenuItems((prev) => [
      ...prev,
      { id: `menu_item_${prev.length}`, label: '', href: '', children: [] },
    ])
  }

  const removeItem = (index) => {
    const newItems = menuItems.filter((_, i) => i !== index)
    setMenuItems(newItems)
    onChange(newItems)
  }

  const addSubItem = (index) => {
    const newItems = [...menuItems]
    newItems[index].children = [
      ...(newItems[index].children || []),
      { id: `sub_menu_item_${newItems[index].children?.length || 0}`, label: '', href: '' },
    ]
    setMenuItems(newItems)
    onChange(newItems)
  }

  const moveItem = (dragIndex, hoverIndex) => {
    const dragItem = menuItems[dragIndex]
    const newList = [...menuItems]
    newList.splice(dragIndex, 1)
    newList.splice(hoverIndex, 0, dragItem)
    setMenuItems(newList)
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="mt-4 w-full">
        <div className="sm:flex sm:items-start sm:justify-between">
          <label className="mb-1 block text-sm font-medium">{label}</label>
          <button type="button" className="shrink-0 p-1.5" onClick={addItem}>
            <Icon kind="plus" size={5} viewBoxSize={24} />
            <div className="sr-only">Add Menu Item</div>
          </button>
        </div>
        {menuItems.map((item, index) => (
          <DraggableItem key={item.id} id={item.id} index={index} moveItem={moveItem}>
            <Accordion
              title={item.label || `Menu Item ${index + 1}`}
              className="mt-2"
              onItemClick={() => {}}
            >
              <div key={index} className="mb-4 p-2">
                <div className="flex flex-wrap justify-between">
                  <div className="w-full">
                    <label className="block text-sm font-medium">Label</label>
                    <input
                      type="text"
                      className="form-input mt-1 block w-full"
                      value={item.label}
                      onChange={(e) => handleItemChange(index, 'label', e.target.value)}
                    />
                  </div>
                  <div className="mt-4 w-full">
                    <label className="block text-sm font-medium">URL</label>
                    <input
                      type="text"
                      className="form-input mt-1 block w-full"
                      value={item.href}
                      onChange={(e) => handleItemChange(index, 'href', e.target.value)}
                    />
                  </div>
                  <button
                    className="btn mt-4 w-full border-slate-200 text-rose-500 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600"
                    onClick={() => addSubItem(index)}
                  >
                    <Icon kind="plus" size={5} viewBoxSize={24} />
                    <span className="ml-2">Add Sub-Menu</span>
                  </button>
                  <button
                    className="btn mt-4 w-full border-slate-200 text-rose-500 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-slate-600"
                    onClick={() => removeItem(index)}
                  >
                    <Icon kind="trash" size={5} viewBoxSize={24} />
                    <span className="ml-2">Remove Item</span>
                  </button>
                </div>
                {item.children && item.children.length > 0 && (
                  <div className="mt-4 border-l pl-4">
                    <MenuField
                      label={`Sub-Menu for ${item.label}`}
                      name={`${name}[${index}].children`}
                      value={item.children}
                      onChange={(subItems) => {
                        const newItems = [...menuItems]
                        newItems[index].children = subItems
                        setMenuItems(newItems)
                        onChange(newItems)
                      }}
                    />
                  </div>
                )}
              </div>
            </Accordion>
          </DraggableItem>
        ))}
      </div>
    </DndProvider>
  )
}

export default MenuField
