'use client'
import React from 'react'
import componentMap from '@/components/ComponentMap'
import OverlayWrapper from '@/components/wrappers/OverlayWrapper'

export const ContentBlocks = ({ blocks }) => {
  if (!blocks || blocks.length === 0) return null
  return (
    <>
      {blocks.map((block, index) => {
        const MDXComponent: React.ElementType | undefined = componentMap[block['type']]
        if (!MDXComponent) return null
        return (
          <OverlayWrapper key={index} domId={`${block.id}`} type="block">
            <MDXComponent data={block} />
          </OverlayWrapper>
        )
      })}
    </>
  )
}
