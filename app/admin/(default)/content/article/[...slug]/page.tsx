import { allContents } from 'contentlayer/generated'
import type { Content } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { FlyoutProvider } from '@/app/admin/flyout-context'
import { ArticleDataProvider } from '@/app/admin/article-data'
import EditorSidebar from './editor-sidebar'
import EditorBody from './editor-body'

function ArticleEditor() {
  return (
    <div className="relative flex h-[100dvh] overflow-hidden" id="editor-content">
      <EditorSidebar />
      <EditorBody />
    </div>
  )
}

export default async function ArticlePage({ params }: { params: { slug: string[] } }) {
  const slug = decodeURI(params.slug.join('/'))
  let article: Content

  if (params.slug[0] === 'edit' && params.slug[1]) {
    article = allContents.find((a) => a.slug === params.slug[1])
    if (!article) {
      return notFound()
    }
  } else if (params.slug[0] === 'create' && !params.slug[1]) {
    article = {
      title: 'New Article',
      slug: '',
      date: new Date().toISOString(),
      draft: true,
      content: '',
    } as Content
  } else {
    return notFound()
  }

  return (
    <FlyoutProvider initialState={true}>
      <ArticleDataProvider data={article} action={params.slug[0]}>
        <ArticleEditor />
      </ArticleDataProvider>
    </FlyoutProvider>
  )
}
