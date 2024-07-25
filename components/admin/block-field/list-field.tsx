// components/admin/block-field/list-field.tsx

import React from 'react'
import BlockField from './index'
import Accordion from '@/components/admin/accordion'
import { Icon } from '@/components/icons'
import { useCallback } from 'react'
import { useBlockData } from '@/app/admin/block-data'
import { useEffect, useState } from 'react'

const ListField = ({ label, name, fields, value }) => {
  //console.log('ListField', fields)
  const [listValue, setListValue] = useState(value || [])
  const { blockData, setBlockData } = useBlockData()

  /* const handleItemChange = (index, fieldName, fieldValue) => {
    const newList = [...value]
    newList[index] = {
      ...newList[index],
      [fieldName]: fieldValue,
    }
    onChange(newList)
  }*/
  useEffect(() => {
    if (blockData[name]) {
      setListValue(blockData[name])
    }
  }, [blockData, name])

  const handleItemChange = useCallback((index, fieldName, fieldValue) => {
    const newValue = {
      ...listValue[index],
      [fieldName]: fieldValue,
    }
    listValue[index] = newValue
    setListValue([...listValue])
    /*setBlockData((prev) => ({
        ...prev,
        [name]: newList,
        }))*/
  }, [])

  useEffect(() => {
    setBlockData((prev) => ({
      ...prev,
      [name]: listValue,
    }))
  }, [listValue])

  const addItem = () => {
    //onChange([...value, {}])
    setBlockData((prev) => ({
      ...prev,
      [name]: [...value, {}],
    }))
  }

  const removeItem = (index) => {
    const newList = value.filter((_, i) => i !== index)
    setBlockData((prev) => ({
      ...prev,
      [name]: newList,
    }))
    //onChange(newList)
  }

  return (
    <div className="mt-4 w-full">
      <div className="sm:flex sm:items-start sm:justify-between">
        <label className="mb-1 block text-sm font-medium">{label}</label>
        <button type="button" className="shrink-0 p-1.5" onClick={addItem}>
          <Icon kind="plus" size={5} viewBoxSize={24} />
          <div className="sr-only">Add Item</div>
        </button>
      </div>
      {listValue?.map((item, index) => (
        <Accordion key={`${label}_${index}`} title={`${label}_${index}`} className="mt-2">
          <div key={index} className="mb-4 p-2">
            <div className="flex flex-wrap justify-between">
              {Object.keys(fields).map((fieldName, idx) => (
                <BlockField
                  key={`${name}[${index}]_${fieldName}_${idx}`}
                  kind={fields[fieldName].kind}
                  label={fields[fieldName].label}
                  name={`${name}[${index}]_${fieldName}_${idx}`}
                  value={item[fieldName]}
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
      ))}
    </div>
  )
}

export default ListField
