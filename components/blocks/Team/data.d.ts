// data.d.ts

export type TeamMemberType = {
  name: string
  position: string
  image: string
  description: string
  twitter?: string
  github?: string
  linkedin?: string
}

export type TeamSectionType = {
  title: string
  titleColor?: string
  date?: string
  members: TeamMemberType[]
}
