export type Tag = {
  id: string
  name: string
  icon?: string
}

export type Blogpost = {
  id: string
  title: string
  date: string
  summary: string
  readTime: string
  content: string
  tags: Tag[]
}

export type BlogpostWithoutContent = Omit<Blogpost, 'content'>
export type BlogpostWithoutTags = Omit<Blogpost, 'tags'>
