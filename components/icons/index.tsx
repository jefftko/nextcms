import {
  Mail,
  Github,
  Facebook,
  Youtube,
  Linkedin,
  Twitter,
  Mastodon,
  Threads,
  Instagram,
} from './social-icons'

import {
  Check,
  ExclamationCircle,
  ArrowLeft,
  Plus,
  Edit,
  Trash,
  Setting,
  Users,
  User,
  Dashboard,
  Article,
  Copy,
  LeftExpand,
  RightExpand,
  File,
  Photo
} from './basic-icons'

export const IconComponents = {
  mail: Mail,
  github: Github,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
  mastodon: Mastodon,
  threads: Threads,
  instagram: Instagram,
  exclamationCircle: ExclamationCircle,
  arrowLeft: ArrowLeft,
  plus: Plus,
  setting: Setting,
  users: Users,
  user: User,
  dashboard: Dashboard,
  article: Article,
}

export const StrokeIconComponents = {
  copy: Copy,
  edit: Edit,
  trash: Trash,
  check: Check,
  leftExpand: LeftExpand,
  rightExpand: RightExpand,
  file: File,
  photo: Photo,
}

type SocialIconProps = {
  kind: keyof typeof IconComponents
  href: string | undefined
  size?: number
}

type IconProps = {
  kind: keyof typeof IconComponents | keyof typeof StrokeIconComponents
  size?: number
  className?: string
  viewBoxSize?: number
}

export const SocialIcon = ({ kind, href, size = 8 }: SocialIconProps) => {
  if (!href || (kind === 'mail' && !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href)))
    return null

  const SocialSvg = IconComponents[kind]

  return (
    <a
      className="text-sm text-gray-500 transition hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <SocialSvg
        className={`fill-current text-gray-700 hover:text-primary-500 dark:text-gray-200 dark:hover:text-primary-400 h-${size} w-${size}`}
      />
    </a>
  )
}

export const Icon = ({ kind, size = 8, className = '', viewBoxSize = 24 }: IconProps) => {
  //判断kind在哪个组件数组里
  if (IconComponents[kind]) {
    const IconSvg = IconComponents[kind]
    return (
      <IconSvg
        className={`fill-current h-${size} w-${size} ${className}`}
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      />
    )
  } else if (StrokeIconComponents[kind]) {
    const IconSvg = StrokeIconComponents[kind]
    return (
      <IconSvg
        className={`fill-none stroke-current h-${size} w-${size} ${className}`}
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )
  } else {
    return null
  }
}
