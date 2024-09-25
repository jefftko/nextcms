import React, { useMemo, useState, useCallback } from 'react'
import { Editable, withReact, Slate } from 'slate-react'
import { createEditor, Descendant } from 'slate'
import { withHistory } from 'slate-history'

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '这是一个简单的编辑器。开始输入...' }],
  },
]

const EditorArea: React.FC = () => {
  const [value, setValue] = useState(initialValue)
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])

  const renderElement = useCallback(props => {
    switch (props.element.type) {
      default:
        return <p {...props.attributes}>{props.children}</p>
    }
  }, [])

  const renderLeaf = useCallback(props => {
    return <span {...props.attributes}>{props.children}</span>
  }, [])

  return (
    <Slate editor={editor} initialValue={value} onChange={value => setValue(value)}>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="在此输入文章内容..."
        className="p-4 min-h-[500px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </Slate>
  )
}

export default EditorArea
