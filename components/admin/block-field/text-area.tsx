import React, { useEffect, useRef } from 'react'

const TextArea = (props) => {
  const { value, onChange, label, name, additional } = props
  const textAreaRef = useRef(null)

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.value = value || ''
    }
  }, [value])

  const handleChange = (e) => {
    onChange(e.target.value)
  }

  return (
    <div className="mt-2 w-full max-w-xl">
      <label className="mb-1 block text-sm font-medium" htmlFor={name}>
        {label}
        {additional?.required && <span className="text-rose-500">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        ref={textAreaRef}
        className="form-textarea mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}

export default TextArea
