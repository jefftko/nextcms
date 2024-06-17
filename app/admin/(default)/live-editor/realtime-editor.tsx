'use client'
import React, { useState } from 'react'
import { LiveProvider, LiveError, LivePreview } from 'react-live'

const initialCode = `
function HelloWorld() {
  return <h1 className="text-2xl font-bold text-center text-blue-500">Hello, world!</h1>;
}
`

const RealTimeEditor = () => {
  const [code, setCode] = useState(initialCode)

  const handleChange = (newCode) => {
    setCode(newCode)
  }

  return (
    <div className="flex h-screen">
      <div className="w-1/4 p-4">
        <textarea
          value={code}
          onChange={(e) => handleChange(e.target.value)}
          className="h-full w-full rounded border p-2"
          placeholder="Enter your React code here"
        />
      </div>
      <div className="w-3/4 border-l p-4">
        <LiveProvider code={code} noInline={false}>
          <LivePreview className="mb-4 rounded border bg-gray-100 p-2" />
          <LiveError className="text-red-500" />
        </LiveProvider>
      </div>
    </div>
  )
}

export default RealTimeEditor
