import { ContentBlocks } from '@/components/BlocksRenderer'
import type { Pages } from 'contentlayer/generated'
import { notFound } from 'next/navigation'

import EditorBody from './editor-body'

export default async function Editor() {
  console.log('editor')

  return (
    <>
      <EditorBody />
    </>
  )
}
