import TextField from './text-field'
import RichText from './rich-text'
import Link from './link'
import ListField from './list-field'
import TextArea from './text-area'
import DatePicker from './date-picker' // 导入 DatePicker 组件
import ImageUpload from './image-upload'
import ColorPicker from './color-picker' // 导入 ColorPicker 组件

const components = {
  text: TextField,
  richText: RichText,
  link: Link,
  list: ListField,
  textArea: TextArea,
  date: DatePicker, // 添加 DatePicker 组件
  image: ImageUpload,
  color: ColorPicker, // 添加 ColorPicker 组件
}

export type AdditionalFieldProps = {
  placeholder?: string
  maxLength?: number
  options?: string[]
  required?: boolean
  type?: string
  flatpickrOptions?: object // 添加 flatpickrOptions 属性
}

export type FieldProps = {
  kind: string
  name: string
  label: string
  additional?: AdditionalFieldProps
  fields?: { [key: string]: FieldProps }
  value?: any
  defaultValue?: any
  onChange?: (value: any) => void
}

const BlockField = (props: FieldProps) => {
  //判断kind是否在components中
  const { kind, label, name, additional, fields, value, defaultValue, onChange } = props
  if (!components[kind]) return null
  const FormField = components[kind]
  return (
    <FormField
      label={label}
      name={name}
      additional={additional}
      fields={fields}
      value={value ? value : defaultValue}
      onChange={onChange}
    />
  )
}

export default BlockField
