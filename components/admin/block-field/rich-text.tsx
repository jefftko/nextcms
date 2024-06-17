import React, { useEffect, useRef } from 'react'
import EasyMDE from 'easymde'
import 'easymde/dist/easymde.min.css' // Ensure the stylesheet is included
import '@fortawesome/fontawesome-free/css/all.min.css'

const RichText = (props) => {
  const editorRef = useRef(null)
  const easyMDEInstance = useRef(null)
  const { value, onChange, label, name, additional } = props

  useEffect(() => {
    if (!editorRef.current) return
    //@ts-ignore
    easyMDEInstance.current = new EasyMDE({
      element: editorRef.current,
      initialValue: value || '',
      autoDownloadFontAwesome: false,
      spellChecker: false,
      status: false, // Disable the status bar
      minHeight: '200px',
    })
    //@ts-ignore
    easyMDEInstance.current.codemirror.on('change', () => {
      // props.onChange(easyMDEInstance.current.value());
      //@ts-ignore
      //setBlockData((prev) => ({ ...prev, [props.name]: easyMDEInstance.current.value() }))
      if (easyMDEInstance.current) {
        //@ts-ignore
        onChange(easyMDEInstance.current.value())
      }
    })

    return () => {
      if (easyMDEInstance.current) {
        //@ts-ignore
        easyMDEInstance.current.toTextArea()
        easyMDEInstance.current = null
      }
    }
  }, [name, editorRef])

  useEffect(() => {
    if (easyMDEInstance.current) {
      //@ts-ignore
      if (props.value !== easyMDEInstance.current.value()) {
        //@ts-ignore
        easyMDEInstance.current.value(props.value)
      }
    }
  }, [value])

  return (
    <div className="mt-2 w-full max-w-xl">
      <label className="mb-1 block text-sm font-medium" htmlFor={name}>
        {label}
        {additional?.required && <span className="text-rose-500">*</span>}
      </label>
      <textarea id={name} ref={editorRef} />
    </div>
  )
}

export default RichText
