import { Client } from "@notionhq/client"
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints"

interface Post {
  id: string
  title: string
  createdAt: string | Date
  content: string
}

export async function getPosts(): Promise<Post[]> {
  const notion = new Client({ auth: process.env.NOTION_API_KEY as string })

  const BLOG_TAG = process.env.BLOG_TAG as string

  const postPages = await notion.databases.query({
    database_id: process.env.BLOG_DB as string,
    filter: {
      property: "Tags",
      relation: {
        contains: BLOG_TAG
      }
    }
  })

  const posts = postPages.results.map(page => ({
    id: page.id,
    title: page.properties.Name.title[0].text.content,
    createdAt: page?.created_time,
    content: page?.page || ''
  }))

  return posts
}

