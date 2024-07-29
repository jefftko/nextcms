//import { components } from '@/components/MDXComponents'
import { sortPosts, coreContent, allCoreContent } from 'pliny/utils/contentlayer'
import { allPages } from 'contentlayer/generated'
import type { Pages } from 'contentlayer/generated'
import { FlyoutProvider } from '@/app/admin/flyout-context'
import { PageDataProvider } from '@/app/admin/page-data'
import EditorSidebar from './editor-sidebar'
import EditorBody from './editor-body'
import { notFound } from 'next/navigation'
//import ModalBasic from '@/components/admin/modal-basic'
import { BlockDataProvider } from '@/app/admin/block-data'
import BlockModal from './block-modal'
import path from 'path'
import fs from 'fs'
import { redirect } from 'next/navigation'

//import PostLayout from '@/layouts/PostLayout'
//import { Metadata } from 'next'
//import siteMetadata from '@/data/siteMetadata'

const defaultLayout = 'PostLayout'
/*const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
}*/

export const generateStaticParams = async () => {
  const paths = allPages.map((p) => ({ slug: p.slug.split('/') }))

  return paths
}

function EditorContent() {
  return (
    <div className="relative flex h-[100dvh] overflow-hidden" id="editor-content">
      <EditorSidebar />
      <EditorBody />
      <BlockModal />

      {/* End */}
    </div>
  )
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  //flyoutOpen: boolean
  const slug = decodeURI(params.slug.join('/'))
  // Filter out drafts in production
  let post: Pages
  if (params.slug[0] === 'edit' && params.slug[1]) {
    // @ts-ignore - Disable TypeScript check for the next line
    const sortedCoreContents = allCoreContent(sortPosts(allPages))
    //post = allPages.find((p) => p.slug === params.slug[1]) as Pages
    post = sortedCoreContents.find((p) => p.slug === params.slug[1]) as Pages
    if (!post) {
      //判断makrdown文件是否存在
      if (fs.existsSync(path.join(process.cwd(), 'data', 'pages', `${params.slug[1]}.mdx`))) {
        return redirect(`/admin/pages/edit/${params.slug[1]}`)
      }
      console.log('post not found')

      return notFound()
    }
    const mainContent = coreContent(post)
  } else if (params.slug[0] === 'create' && !params.slug[1]) {
    post = {
      title: 'New Page',
      pagePath: '',
      status: 'unpublished',
      isDefault: false,
      blocks: [],
    } as Pages
    //const slug = decodeURI(params.slug.join('/'))
    //post = allPages.find((p) => p.slug === slug) as Page
  } else {
    return notFound()
  }

  return (
    <FlyoutProvider initialState={true}>
      <PageDataProvider data={post} action={params.slug[0]}>
        <BlockDataProvider>
          <EditorContent />
        </BlockDataProvider>
      </PageDataProvider>
    </FlyoutProvider>
  )
}
