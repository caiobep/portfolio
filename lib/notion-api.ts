import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'
import { remark } from 'remark'
import html from 'remark-html'

export interface NotionPage {
  id: string
  title: string
  createdAt: string | Date
  content: string | Map<string, unknown> | undefined
  url: string
  notionUrl: string
}

export interface Page {
  htmlContent: string | any
  date: string
  title?: string
  icon?: string
  cover?: string
}

export interface NotionPageResponse {
  id: string
  page: Map<string, unknown>
  url: string
  created_time: string
  properties: {
    Name: {
      title: [
        {
          text: {
            content: string
          }
        },
      ]
    }
  }
}

export function convertNotionReturnToPageObject(
  page: NotionPageResponse,
): NotionPage {
  return {
    id: page?.id,
    title: page.properties.Name.title[0].text.content,
    url: sanitizeStringUri(page.properties.Name.title[0].text.content),
    createdAt: page?.created_time,
    content: page?.page || {},
    notionUrl: page?.url,
  }
}

export const createNotionClient = () =>
  new Client({ auth: process.env.NOTION_API_KEY as string })

export const sanitizeStringUri = (s: string) =>
  s
    .replaceAll(' ', '-')
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '')

export async function getPosts(): Promise<NotionPage[]> {
  const notion = createNotionClient()

  const BLOG_TAG = process.env.BLOG_TAG as string

  const postPages = await notion.databases.query({
    database_id: process.env.BLOG_DB as string,
    filter: {
      property: 'Tags',
      relation: {
        contains: BLOG_TAG,
      },
    },
  })

  const posts = (
    postPages.results as unknown as NotionPageResponse[]
  ).map<NotionPage>(convertNotionReturnToPageObject)

  return posts
}

export async function getAllPostIds(): Promise<string[]> {
  const posts = await getPosts()
  return posts.map((p) => p.url)
}

export async function getPostContent(pageId: string): Promise<Page> {
  const notionClient = createNotionClient()
  const page = (await notionClient.pages.retrieve({
    page_id: pageId,
  })) as unknown as NotionPageResponse
  const parsedPage = convertNotionReturnToPageObject(page)
  const n2m = new NotionToMarkdown({ notionClient: createNotionClient() })
  const markdownBlocks = await n2m.pageToMarkdown(pageId)
  const pageInMarkdownString = n2m.toMarkdownString(markdownBlocks)

  const htmlContent = (
    await remark().use(html).process(pageInMarkdownString)
  ).toString()

  return {
    ...parsedPage,
    date: parsedPage.createdAt.toString(),
    htmlContent,
  }
}
