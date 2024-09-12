'use server'
import fs from 'fs'
import path from 'path'
import * as matter from 'gray-matter'
import { allContents } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import type { Content } from 'contentlayer/generated'

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
  if (posts.some((post) => post.slug === data.slug)) {
    return { status: 'error', message: 'Content with this slug already exists.' }
  }

  const filePath = path.join(
    process.cwd(),
    'data',
    'content',
    `${data.slug.replace(/ /g, '-')}.mdx`
  )

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
  const filePath = path.join(
    process.cwd(),
    'data/content',
    `${data.filePath.replace(/ /g, '-')}.mdx`
  )

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
      if (content.slug == data) {
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

/* get category data */
export async function getCategoryData() {
  const categoryDataPath = path.join(process.cwd(), 'app/category-data.json')
  const rawData = fs.readFileSync(categoryDataPath, 'utf8')
  return JSON.parse(rawData)
}

/* 添加或编辑分类 */
export async function addOrEditCategory(categoryData: Record<string, any>) {
  try {
    const categoryDataPath = path.join(process.cwd(), 'app/category-data.json')
    const data = await getCategoryData()
    if(categoryData.type === 'add'){
      //if slug is exists, return error
      if(data[categoryData.slug]){
        return { status: 'error', message: '分类已存在。' }
      }else{
        data[categoryData.slug] = {
          name: categoryData.name,
          description: categoryData.description,
          layout: categoryData.layout,
        }
      }
    }else{
      //remove slug
      if(categoryData.oldSlug && categoryData.oldSlug !== categoryData.slug){
        if(data[categoryData.slug]){
          return { status: 'error', message: '分类已存在。' }
        }
        delete data[categoryData.oldSlug]
      }
      data[categoryData.slug] = {
        name: categoryData.name,
        description: categoryData.description,
        layout: categoryData.layout,
      }
    }
    fs.writeFileSync(categoryDataPath, JSON.stringify(data, null, 2), 'utf8')
    if(categoryData.type === 'add'){  
      return { status: 'success', message: '分类成功保存。' }
    }else{
      return { status: 'success', message: '分类成功更新。' }
    }
  } catch (err) {
    console.error(err)
    return { status: 'error', message: '保存分类时出错。' }
  }
}

/* 删除分类 */
export async function deleteCategory(slug: string) {
  try {
    const categoryDataPath = path.join(process.cwd(), 'app/category-data.json')
    
    // 读取现有的分类数据
    const rawData = fs.readFileSync(categoryDataPath, 'utf8')
    const categoryData = JSON.parse(rawData)

    // 删除指定的分类
    if (categoryData[slug]) {
      delete categoryData[slug]
      
      // 写入更新后的分类数据
      fs.writeFileSync(categoryDataPath, JSON.stringify(categoryData, null, 2), 'utf8')
      
      return { status: 'success', message: '分类成功删除。' }
    } else {
      return { status: 'error', message: '未找到指定的分类。' }
    }
  } catch (err) {
    console.error(err)
    return { status: 'error', message: '删除分类时出错。' }
  }
}
