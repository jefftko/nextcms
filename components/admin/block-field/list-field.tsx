// components/admin/block-field/list-field.tsx

import React from 'react'
import BlockField from './index'
import Accordion from '@/components/admin/accordion'
import { Icon } from '@/components/icons'

const ListField = ({ label, name, fields, value, onChange }) => {
  //console.log('ListField', fields)

  const handleItemChange = (index, fieldName, fieldValue) => {
    const newList = [...value]
    newList[index] = {
      ...newList[index],
      [fieldName]: fieldValue,
    }
    onChange(newList)
  }

  const addItem = () => {
    onChange([...value, {}])
  }

  const removeItem = (index) => {
    const newList = value.filter((_, i) => i !== index)
    onChange(newList)
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
      {value?.map((item, index) => (
        <Accordion title={`${label}_${index}`} className="mt-2">
          <div key={index} className="mb-4 p-2">
            <div className="flex flex-wrap justify-between">
              {Object.keys(fields).map((fieldName) => (
                <BlockField
                  key={fieldName}
                  kind={fields[fieldName].kind}
                  label={fields[fieldName].label}
                  name={`${name}[${index}].${fieldName}`}
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
