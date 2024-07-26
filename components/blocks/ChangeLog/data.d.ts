// data.d.ts

export type ChangeLogItemType = {
  name: string
  image: string
  description: string
  date: string
}

export type ChangeLogType = {
  title: string
  items: ChangeLogItemType[]
}
