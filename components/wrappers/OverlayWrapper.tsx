// components/OverlayWrapper.js
'use client'
import { v4 as uuidv4 } from 'uuid'
import React from 'react'
import { useAppProvider } from '@/app/(default)/app-provider'

function OverlayWrapper({ children, domId }) {
  const { showOverlay } = useAppProvider()
  const generatedId = domId || uuidv4() // 确保 id 一致
  const handleClick = () => {
    if (showOverlay) {
      window.parent.postMessage({ type: 'editBlock', generatedId }, '*')
    }
  }

  const handleKeyPress = (e) => {
    if (showOverlay && (e.key === 'Enter' || e.key === ' ')) {
      console.log('keypress', generatedId)
      window.parent.postMessage({ type: 'editBlock', generatedId }, '*')
    }
  }
  //console.log('showOverlay',showOverlay)
  return (
    <>
      {showOverlay ? (
        <div
          className={`group relative border-4 border-dashed border-transparent hover:border-blue-500`}
          id={generatedId}
          onKeyPress={handleKeyPress}
          role="button"
          onClick={handleClick}
          tabIndex={0} // 使元素可以通过键盘聚焦
        >
          <div className="absolute inset-0 z-10 bg-yellow-500 opacity-0 transition-opacity group-hover:opacity-5"></div>
          {children}
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  )
}

export default OverlayWrapper
