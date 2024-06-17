//'use server'
import fs from 'fs'
import path from 'path'
import * as matter from 'gray-matter'
import { allPages } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import type { Pages } from 'contentlayer/generated'

/* Create page */

export async function createPage(data: any) {
  const frontMatter = { ...data }
  const mdxContent = matter.stringify('', frontMatter)
  //@ts-ignore
  const posts = allCoreContent(sortPosts(allPages)) as Pages[]
  //checkPagePath empty or not
  if (!data.pagePath || data.pagePath === '') {
    return { status: 'error', message: 'Page path is required.' }
  }
  //check if pagePath already exists
  for (const post of posts) {
    if (post.pagePath === data.pagePath) {
      return { status: 'error', message: 'Page path already exists.' }
    }
  }
  const filePath = path.join(process.cwd(), 'data/pages', `${data.pagePath.replace(/ /g, '-')}.mdx`)
  //if filePath alreay exists reutrn error
  if (fs.existsSync(filePath)) {
    return { status: 'error', message: 'Page path already exists.' }
  }
  try {
    fs.writeFileSync(filePath, mdxContent, 'utf8')
    return { status: 'success', message: 'MDX file saved successfully.' }
  } catch (err) {
    console.error(err)
    return { status: 'error', error: 'Error saving MDX file.' }
  }
}

/* Edit page */

export async function editPage(data: any) {
  const frontMatter = { ...data }
  const mdxContent = matter.stringify('', frontMatter)
  //@ts-ignore
  //const posts = allCoreContent(sortPosts(allPages)) as Pages[]

  //checkPagePath empty or not
  if (!data.pagePath || data.pagePath === '') {
    return { status: 'error', message: 'Page path is required.' }
  }
  const filePath = path.join(process.cwd(), 'data/pages', `${data.pagePath.replace(/ /g, '-')}.mdx`)

  try {
    fs.writeFileSync(filePath, mdxContent, 'utf8')
    return { status: 'success', message: 'MDX file saved successfully.' }
  } catch (err) {
    console.error(err)
    return { status: 'error', error: 'Error saving MDX file.' }
  }
}

/* set default page to non default */

export async function setPageNotDefault(pagePath) {
  //@ts-ignore
  const posts = allCoreContent(sortPosts(allPages)) as Pages[]
  for (const post of posts) {
    if (post.isDefault && post.pagePath !== pagePath) {
      const filePath = path.join(
        process.cwd(),
        'data/pages',
        `${post.pagePath.replace(/ /g, '-')}.mdx`
      )
      const frontMatter = { ...post, isDefault: false }
      const mdxContent = matter.stringify('', frontMatter)
      try {
        fs.writeFileSync(filePath, mdxContent, 'utf8')
      } catch (err) {
        console.error(err)
        return { status: 'error', error: 'Error setting default page.' }
      }
    }
  }
}

/* Delete page */

export async function deletePage(data: any) {
  //@ts-ignore
  const posts = allCoreContent(sortPosts(allPages)) as Pages[]
  //check if pagePath exists and check if it is a default page
  for (const post of posts) {
    if (post.pagePath === data.pagePath) {
      if (post.isDefault) {
        return { status: 'error', message: 'Default page cannot be deleted.' }
      }
    }
  }
  const filePath = path.join(process.cwd(), 'data/pages', `${data.pagePath.replace(/ /g, '-')}.mdx`)
  try {
    fs.unlinkSync(filePath)
    return { status: 'success', message: 'MDX file deleted successfully.' }
  } catch (err) {
    console.error(err)
    return { status: 'error', error: 'Error deleting MDX file.' }
  }
}
