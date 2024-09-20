import React from 'react'
import LayoutDefault from './LayoutDefault'
import AuthorLayout from './AuthorLayout'
import ListLayout from './ListLayout'
import ListLayoutWithTag from './ListLayoutWithTags'

import PostLayout from './PostLayout'
import PostSimple from './PostSimple'
import PostBanner from './PostBanner'

export const layouts = {
  layoutDefault: LayoutDefault,
  authorLayout: AuthorLayout,
  listLayout: ListLayout,
  listLayoutWithTag: ListLayoutWithTag,
  postLayout: PostLayout,
  postSimple: PostSimple,
  postBanner: PostBanner,
}

type LayoutProps = {
  layout: keyof typeof layouts
  children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ layout, children }) => {
  const LayoutComponent = layouts[layout]
  return <LayoutComponent>{children}</LayoutComponent>
}

export default Layout
