// components/OverlayWrapper.js
'use client'
import React from 'react'
import { useAppProvider } from '@/app/app-provider'

function OverlayWrapper({ children, domId, type = 'common' }) {
  const { showOverlay } = useAppProvider()
  // 生成唯一 id
  const generatedId = domId || Math.random().toString(36).substring(7)
  const handleClick = () => {
    if (showOverlay) {
      window.parent.postMessage({ type: 'editBlock', generatedId, domType: type }, '*')
    }
  }

  const handleKeyPress = (e) => {
    if (showOverlay && (e.key === 'Enter' || e.key === ' ')) {
      console.log('keypress', generatedId)
      window.parent.postMessage({ type: 'editBlock', generatedId, domType: type }, '*')
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
