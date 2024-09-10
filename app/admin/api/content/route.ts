import { type NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import * as matter from 'gray-matter'
import { allContents } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import type { Content } from 'contentlayer/generated'
import { createContent, editContent, deleteContent } from '@/utils/contentActions'

const handler = async (req: NextRequest) => {
  const data = await req.json()

  try {
    const res = await createContent(data)
    return NextResponse.json(res, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ status: 'error', error: 'Error saving MDX file.' }, { status: 500 })
  }
}

export { handler as POST }

export async function PUT(req: NextRequest) {
  const data = await req.json()
  try {
    const res = await editContent(data)
    return NextResponse.json(res, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ status: 'error', error: 'Error saving MDX file.' }, { status: 500 })
  }
}
