import { buttonStyles } from '@/style.config'

const Link = (props) => {
  const { label, name, value, onChange, additional } = props

  const onLinkChange = (field, fieldValue) => {
    onChange({
      ...value,
      [field]: fieldValue,
    })
  }

  return (
    <div className="mt-2 w-full max-w-xl">
      <label className="mb-1 block text-sm font-medium" htmlFor={name}>
        {label}
        {additional?.required && <span className="text-rose-500">*</span>}
      </label>
      <div className="mb-2 mt-2 rounded border p-2">
        <label className="mb-1 block text-sm font-medium" htmlFor={`title-${name}`}>
          Title
        </label>
        <input
          id={`title-${name}`}
          className="form-input mb-2 w-full"
          type="text"
          value={value?.title || ''}
          onChange={(e) => onLinkChange('title', e.target.value)}
        />
        <label className="mb-1 block text-sm font-medium" htmlFor={`url-${name}`}>
          URL
        </label>
        <input
          id={`url-${name}`}
          className="form-input mb-2 w-full"
          type="text"
          value={value?.url || ''}
          onChange={(e) => onLinkChange('url', e.target.value)}
        />
        <label className="mb-1 block text-sm font-medium">
          Open in New Tab
          <input
            type="checkbox"
            className="ml-2"
            checked={value?.newTab || false}
            onChange={(e) => onLinkChange('newTab', e.target.checked)}
          />
        </label>
        <label className="mb-1 block text-sm font-medium" htmlFor={`style-${name}`}>
          Style
        </label>
        <select
          id={`style-${name}`}
          className="form-select w-full"
          value={value?.style || 'default'}
          onChange={(e) => onLinkChange('style', e.target.value)}
        >
          <option value="default">Default</option>
          {buttonStyles.map((style) => (
            <option key={style.name} value={style.className}>
              {style.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default Link
