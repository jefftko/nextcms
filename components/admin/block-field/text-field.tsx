import React from 'react'

interface AdditionalProps {
  required?: boolean
  type?: string
  [key: string]: any // This allows any additional props
}

interface TextFieldProps {
  label: string
  name: string
  value: string
  onChange: (value: string) => void
  additional?: AdditionalProps
}

const TextField: React.FC<TextFieldProps> = ({ label, name, value, onChange, additional }) => {
  const [error, setError] = React.useState<string | null>(null)
  const { required, type = 'text', ...rest } = additional || {}

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    let errorMessage: string | null = null

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

export default TextField
