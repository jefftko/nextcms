export type Logo = {
  src: string
  alt: string
  width: number
  height: number
}
export type Nav = {
  href: string
  label: string
  children?: Nav[]
}

export type HeaderType = {
  logo: Logo
  nav: Nav[]
}
