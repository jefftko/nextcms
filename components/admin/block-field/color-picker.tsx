'use client'

import { useState } from 'react'
import { SketchPicker } from 'react-color'

interface ColorPickerProps {
  label: string
  name: string
  value?: string
  onChange?: (color: string) => void
  additional?: {
    required?: boolean
  }
}

const ColorPicker = ({ label, name, value, onChange, additional }: ColorPickerProps) => {
  const [color, setColor] = useState<string>(value || '#ffffff')
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false)

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker)
  }

  const handleClose = () => {
    setDisplayColorPicker(false)
  }

  const handleChange = (color: any) => {
    setColor(color.hex)
    if (onChange) onChange(color.hex)
  }

  return (
    <div className="mt-2 w-full max-w-xl">
      <label className="mb-1 block text-sm font-medium" htmlFor={name}>
        {label}
        {additional?.required && <span className="text-rose-500">*</span>}
      </label>
      <div className="relative">
        <div className="flex items-center">
          <div
            className="h-10 w-10 cursor-pointer border border-gray-300"
            style={{ backgroundColor: color }}
            onClick={handleClick}
          />
          <input
            type="text"
            id={name}
            name={name}
            value={color}
            readOnly
            className="form-input ml-2 w-[15.5rem] pl-2 font-medium text-slate-500 hover:text-slate-600 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-slate-200"
          />
        </div>
        {displayColorPicker ? (
          <div className="absolute z-10">
            <div className="fixed inset-0" onClick={handleClose} />
            <SketchPicker color={color} onChange={handleChange} />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default ColorPicker
