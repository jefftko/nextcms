import React from 'react'
import LayoutDefault from './LayoutDefault'

export const layouts = {
  layoutDefault: LayoutDefault,
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
