import { Client } from "@notionhq/client"
import NotionPageToHtml from "notion-page-to-html"

interface Post {
  id: string
  title: string
  createdAt: string | Date
  content: string
  url: string
  notionUrl: string
}

interface Page {
  htmlContent: string;
  title?: string;
  icon?: string;
  cover?: string;
}

const createNotionClient = () => new Client({ auth: process.env.NOTION_API_KEY as string })

export const sanitizeStringUri = (s: string) => s.replaceAll(' ', '-').toLowerCase().replace(/[^a-z0-9-]/g, '')

export async function getPosts(): Promise<Post[]> {
  const notion = createNotionClient()

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
    url: sanitizeStringUri(page.properties.Name.title[0].text.content),
    createdAt: page?.created_time,
    content: page?.page || '',
    notionUrl: page?.url || '',
  }))

  return posts
}

export async function getAllPostIds(): Promise<string[]> {
  const posts = await getPosts()
  return posts.map(p => p.url)
}

export async function getPostContent(pageURL: string): Promise<Page> {
  const { html, ...pageContent } = await NotionPageToHtml.convert(pageURL)
  const htmlContent = html.replace(/<header[^>]*>.*<\/header>/gs, '')

  return {
    ...pageContent,
    htmlContent
  }
}

