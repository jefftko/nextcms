import React from 'react'

interface Option {
  value: string
  label: string
}

interface AdditionalProps {
  required?: boolean
  placeholder?: string
  options?: Option[] // 将 options 放在 additional 中
  [key: string]: any
}

interface SelectFieldProps {
  label: string
  name: string
  value: string
  onChange: (value: string) => void
  additional?: AdditionalProps
}

const SelectField: React.FC<SelectFieldProps> = ({ label, name, value, onChange, additional }) => {
  const [error, setError] = React.useState<string | null>(null)
  const { required, placeholder, options = [], ...rest } = additional || {}

  const handleBlur = () => {
    let errorMessage: string | null = null

    if (required && !value) {
      errorMessage = 'This field is required'
    }

    setError(errorMessage)
  }

  return (
    <div className="mt-2 w-full max-w-xl">
      <label className="mb-1 block text-sm font-medium" htmlFor={name}>
        {label}
        {required && <span className="text-rose-500">*</span>}
      </label>
      <select
        id={name}
        className="form-select w-full"
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={handleBlur}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
    </div>
  )
}

export default SelectField

/* 
  Usage Example:

  import SelectField from './select-field';

  <SelectField
    label="Country"
    name="country"
    value={selectedCountry}
    onChange={(value) => setSelectedCountry(value)}
    additional={{
      required: true,
      placeholder: 'Please select a country',
      options: [
        { value: 'us', label: 'United States' },
        { value: 'ca', label: 'Canada' },
        { value: 'uk', label: 'United Kingdom' },
      ],
    }}
  />

  In the example above:
  - The `label` prop sets the label text for the select field.
  - The `name` prop sets the name attribute of the select field.
  - The `value` prop binds the current selected value.
  - The `onChange` prop handles value changes.
  - The `additional` prop now contains `required`, `placeholder`, and `options`:
    - `required`: Whether the field is mandatory.
    - `placeholder`: Placeholder text shown as the first option.
    - `options`: The list of options available for selection, each with a `value` and `label`.
*/
