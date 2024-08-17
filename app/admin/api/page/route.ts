import { type NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import * as matter from 'gray-matter'
import { allPages } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import type { Pages } from 'contentlayer/generated'
import { createPage, editPage, deletePage, setPageNotDefault } from '@/utils/pageActions'
import { editGlobal } from '@/utils/globalActions'

const handler = async (req: NextRequest) => {
  const data = await req.json()
  /*const frontMatter = { ...data }
  const mdxContent = matter.stringify('', frontMatter)
  console.log(frontMatter)
  const posts = allCoreContent(sortPosts(allPages)) as Pages[]
  //checkPagePath empty or not
  if (!data.pagePath || data.pagePath === '') {
    return NextResponse.json({status:"error",message: 'Page path is required.' }, { status: 400 })
  }
  //检查 pagePath 是否已经存在
  for (const post of posts) {
    if (post.pagePath === data.pagePath) {
      return NextResponse.json({status:"error", message: 'Page path already exists.' }, { status: 400 })
    }
  }
  const filePath = path.join(process.cwd(), 'data/pages', `${data.pagePath.replace(/ /g, '-')}.mdx`)
  try {
    fs.writeFileSync(filePath, mdxContent, 'utf8')
    return NextResponse.json({ status:"success",message: 'MDX file saved successfully.' }, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ status:"error",error: 'Error saving MDX file.' }, { status: 500 })
  }*/
  try {
    //filter globalData from data
    const { globalData, ...pageData } = data
    await editGlobal(globalData)
    const res = await createPage(pageData)
    return NextResponse.json(res, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ status: 'error', error: 'Error saving MDX file.' }, { status: 500 })
  }
}

export { handler as POST }

//edit Page
export async function PUT(req: NextRequest) {
  const data = await req.json()
  //检查 pagePath 是否存在 并且检查是否是isDefault page
  try {
    if (data.isDefault) {
      await setPageNotDefault(data.pagePath)
    }
    const { globalData, ...pageData } = data
    console.log(globalData['nav'])
    await editGlobal(globalData)
    const res = await editPage(pageData)
    return NextResponse.json(res, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ status: 'error', error: 'Error saving MDX file.' }, { status: 500 })
  }
}

//Dlete page

export async function DELETE(req: NextRequest) {
  const data = await req.json()
  //@ts-ignore
  const posts = allCoreContent(sortPosts(allPages)) as Pages[]
  //检查 pagePath 是否存在 并且检查是否是isDefault page
  for (const post of posts) {
    if (post.pagePath === data.pagePath) {
      if (post.isDefault) {
        return NextResponse.json(
          { status: 'error', message: 'Default page cannot be deleted.' },
          { status: 400 }
        )
      }
    }
  }
  const filePath = path.join(process.cwd(), 'data/pages', `${data.pagePath.replace(/ /g, '-')}.mdx`)
  try {
    fs.unlinkSync(filePath)
    return NextResponse.json(
      { status: 'success', message: 'MDX file deleted successfully.' },
      { status: 200 }
    )
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { status: 'error', message: 'Error deleting MDX file.' },
      { status: 500 }
    )
  }
}
