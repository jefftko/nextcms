// components/OverlayWrapper.js
'use client'
import React from 'react'
import { useAppProvider } from '@/app/(default)/app-provider'

function OverlayWrapper({ children, id }) {
  const { showOverlay } = useAppProvider()
  const handleClick = () => {
    if (showOverlay) {
      console.log('click', id)
      window.parent.postMessage({ type: 'editBlock', id }, '*')
    }
  }

  const handleKeyPress = (e) => {
    if (showOverlay && (e.key === 'Enter' || e.key === ' ')) {
      console.log('keypress', id)
      window.parent.postMessage({ type: 'editBlock', id }, '*')
    }
  }
  //console.log('showOverlay',showOverlay)
  return (
    <>
      {showOverlay ? (
        <div
          className={`group relative border-4 border-dashed border-transparent hover:border-blue-500`}
          id={id}
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
