import { allContents } from 'contentlayer/generated'
import type { Content } from 'contentlayer/generated'
import { notFound } from 'next/navigation'

export default async function ArticlePage({ params }: { params: { slug: string[] } }) {
  const slug = decodeURI(params.slug.join('/'))
  let article: Content | undefined

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
    } as Content
  } else {
    return notFound()
  }

  return (
    <div>
      <h1>{article.title}</h1>
      <p>Slug: {article.slug}</p>
      <p>Date: {article.date}</p>
      <p>Draft: {article.draft ? 'Yes' : 'No'}</p>
    </div>
  )
}
