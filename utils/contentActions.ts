'use server'
import fs from 'fs'
import path from 'path'
import * as matter from 'gray-matter'
import { allContents } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import type { Content } from  'contentlayer/generated'

/* Create page */

//typescript-eslint/no-explicit-any off
//eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function createContent(data: any): Promise<{ status: string; message: string }> {
  const frontMatter = { ...data }
  const mdxContent = matter.stringify('', frontMatter)
  const posts = allCoreContent(sortPosts(allContents)) as Content[]

  if (!data.slug || data.slug === '') {
    return { status: 'error', message: 'Content slug is required.' }
  }

  // Check if slug already exists
  if (posts.some(post => post.slug === data.slug)) {
    return { status: 'error', message: 'Content with this slug already exists.' }
  }

  const filePath = path.join(process.cwd(), 'data', 'content', `${data.slug.replace(/ /g, '-')}.mdx`)

  if (fs.existsSync(filePath)) {
    return { status: 'error', message: 'Content file already exists.' }
  }

  try {
    fs.writeFileSync(filePath, mdxContent, 'utf8')
    return { status: 'success', message: 'Content file created successfully.' }
  } catch (err) {
    console.error(err)
    return { status: 'error', message: 'Error creating content file.' }
  }
}

/* Edit Content */
//eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function editContent(data: Content) {
  const frontMatter = { ...data }
  const mdxContent = matter.stringify('', frontMatter)
  //@ts-ignore
  //const posts = allCoreContent(sortPosts(allPages)) as Pages[]

  //checkPagePath empty or not
  if (!data.filePath || data.filePath === '') {
    return { status: 'error', message: 'File path is required.' }
  }
  const filePath = path.join(process.cwd(), 'data/content', `${data.filePath.replace(/ /g, '-')}.mdx`)

  try {
    fs.writeFileSync(filePath, mdxContent, 'utf8')
    return { status: 'success', message: 'MDX file saved successfully.' }
  } catch (err) {
    console.error(err)
    return { status: 'error', error: 'Error saving MDX file.' }
  }
} 


/* Delete page */
//eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function deleteContent(data: string) {
  //@ts-ignore
  //check if pagePath exists and check if it is a default page
  //const filePath = path.join(process.cwd(), 'data', data.filePath)
  try {
  const contents = allCoreContent(sortPosts(allContents)) as Content[]
  let filePath = ''
  for (const content of contents) {
    if(content.slug == data){
      filePath = path.join(process.cwd(), 'data', `${content.path}.mdx`)
    }
  }
    fs.unlinkSync(filePath)
    //fs.unlinkSync(filePath)
    return { status: 'success', message: 'MDX file deleted successfully.' }
  } catch (err) {
    console.error(err)
    return { status: 'error', message: 'Error deleting MDX file.' }
  }
}
