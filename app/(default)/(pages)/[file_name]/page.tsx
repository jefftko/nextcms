import { components } from '@/components/MDXComponents'
import { ContentBlocks } from '@/components/BlocksRenderer'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { sortPosts, coreContent, allCoreContent } from 'pliny/utils/contentlayer'
import { allPages } from 'contentlayer/generated'
import type { Pages } from 'contentlayer/generated'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'

import Layout, { layouts } from '@/layouts/index'

export default async function Page({ params }: { params: { file_name: string } }) {
  let post
  if (params.file_name === 'index') {
    //find isDefault is true
    post = allPages.find((p) => p.isDefault === true)
  } else {
    post = allPages.find((p) => p.slug === params.file_name)
  }
  //文件如果不存在，返回404
  if (!post) {
    return notFound()
  }
  const mainContent = coreContent(post)

  //check layout of the post , if not exist, use default layout
  let postLayout = 'layoutDefault'
  if (post.layout && post.layout !== undefined && post.layout != 'default') {
    postLayout = post.layout
  }

  //const Layout = layouts[post.layout || pageLayout]

  return (
    <>
      {/* ignore next line */}
      <Layout layout={postLayout as keyof typeof layouts}>
        {/*<MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc} />*/}
        <ContentBlocks blocks={post.blocks} />
      </Layout>
    </>
  )
}
