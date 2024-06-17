export type HeroHomeType = {
  id: string
  type: string
  title?: string | undefined
  description?: string | undefined
  buttons?: Array<{ text: string; link: string; style: string }>
  subTitle?: string | undefined
  video?: string | undefined
  links?: Array<{ title: string; url: string; newTab: boolean }>
  link?: { title: string; url: string; newTab: boolean; style: string }
}
