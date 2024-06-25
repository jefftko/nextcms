/*export default function TextField({ label, name, value, onChange, additional }) {
  return (
    <div className="mt-2 w-full max-w-xl">
      <label className="mb-1 block text-sm font-medium" htmlFor={name}>
        {label}
        {additional?.required && <span className="text-rose-500">*</span>}
      </label>
      <input
        id={name}
        className="form-input w-full"
        type="text"
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}*/

import React from 'react'

export default function TextField({ label, name, value, onChange, additional }) {
  const [error, setError] = React.useState(null)
  const { required, type = 'text', ...rest } = additional || {}

  const handleBlur = (e) => {
    const inputValue = e.target.value
    let errorMessage = null

    if (type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(inputValue)) {
        errorMessage = 'Invalid email format'
      }
    } else if (type === 'number') {
      const numberRegex = /^[0-9]*$/
      if (!numberRegex.test(inputValue)) {
        errorMessage = 'Invalid number format'
      }
    }

    setError(errorMessage)
  }

  return (
    <div className="mt-2 w-full max-w-xl">
      <label className="mb-1 block text-sm font-medium" htmlFor={name}>
        {label}
        {required && <span className="text-rose-500">*</span>}
      </label>
      <input
        id={name}
        className="form-input w-full"
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={handleBlur}
        {...rest}
      />
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
    </div>
  )
}
