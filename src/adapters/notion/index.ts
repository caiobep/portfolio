import { Client } from '@notionhq/client'
import fs from 'fs/promises'
import path from 'path'
import type {
  PageObjectResponse,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints'
import { NotionToMarkdown } from 'notion-to-md'

import environment from '../../infrastructure/environment.js'

const DIR = path.join('src', 'content', 'blog-posts')

export const notion = new Client({
  auth: environment.NOTION_API_KEY,
})

async function getBlogPosts(
  startCursor?: string,
): Promise<QueryDatabaseResponse> {
  try {
    const items = await notion.databases.query({
      database_id: environment.NOTION_BLOG_DATABASE,
      ...(startCursor && { start_cursor: startCursor }),
      filter: {
        property: 'Tags',
        relation: {
          contains: environment.NOTION_BLOG_TAG,
        },
      },
    })

    return items
  } catch (e) {
    throw new Error(e)
  }
}

async function getAllBlogPosts() {
  const pagesInMemory: PageObjectResponse[] = []

  let nextCursor
  do {
    const pages = await getBlogPosts(nextCursor)
    pagesInMemory.push(...(pages?.results as PageObjectResponse[]))
    nextCursor = pages?.next_cursor || null
  } while (nextCursor !== null)

  return pagesInMemory
}

function getSafeFilenameStringFromPageName(pageName: string): string {
  return (
    pageName
      .trim()
      .replaceAll(' ', '_')
      .replaceAll('/', '')
      .replaceAll('"', '')
      .replaceAll('?', '')
      .replaceAll(':', '') + '.md'
  )
}

interface NotionTagResponse {
  id: string
  icon: { emoji?: string; url?: string }
  properties: {
    Name: { title: [{ plain_text: string }] }
  }
}

type Tag = { id: string; name: string; icon: string }
const tagsCache: Record<string, Tag> = {}
const getTagNameAndIcon = async (tagId: string): Promise<Tag> => {
  const dataInCache = tagsCache[tagId]
  if (dataInCache !== undefined) {
    return dataInCache
  }

  try {
    const tag = (await notion.pages.retrieve({
      page_id: tagId,
      filter_properties: ['title'],
    })) as unknown as NotionTagResponse

    const name = tag.properties.Name.title[0].plain_text
    const icon = tag?.icon?.emoji || tag?.icon?.url || ''
    const id = tag?.id
    const tagValue = { id, name, icon }

    tagsCache[tagId] = tagValue

    return tagValue
  } catch (er) {
    throw new Error(er as any)
  }
}

function buildPageHeader(headerProps: Record<string, string | object>) {
  const pageHeaders = Object.entries(headerProps)
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
    .join('\n')

  return `---\n${pageHeaders}\n---`
}

interface Page {
  title: string
  date: string
  summary: string
  tagIds: string[]
  readTime: string
}

function getPropertiesFromPage(page: PageObjectResponse): Page {
  return {
    date: page?.created_time,
    title: page?.properties?.Name?.title?.[0]?.plain_text,
    summary: page?.properties?.Summary?.rich_text?.[0]?.plain_text,
    readTime: page?.properties?.['Time to Read']?.rich_text?.[0]?.plain_text,
    tagIds: page?.properties?.Tags?.relation.map(t => t?.id),
  }
}

async function fetchBlogpostsFromNotionAndWriteThemAsMarkdowninFs() {
  const startTime = performance.now()

  const dirCleaningTime = performance.now()
  await fs.rm(DIR, { recursive: true, force: true })
  await fs.mkdir(DIR)
  console.log('Cleaning dir in: ', performance.now() - dirCleaningTime, 'ms')

  const n2m = new NotionToMarkdown({
    notionClient: notion,
    config: {
      parseChildPages: true,
    },
  })

  n2m.setCustomTransformer('embed', async block => {
    const { embed } = block as any
    if (!embed?.url) return ''
    return `<figure>
    <iframe src="${embed?.url}"></iframe>
    <figcaption>${await n2m.blockToMarkdown(embed?.caption)}</figcaption>
  </figure>`
  })

  const timeToGetAllBlogPosts = performance.now()
  const pages = await getAllBlogPosts()
  console.log(
    'Time to get all blog posts: ',
    performance.now() - timeToGetAllBlogPosts,
    'ms',
  )

  const tasks = pages.map(async page => {
    const { title, date, tagIds, summary, readTime } =
      getPropertiesFromPage(page)
    const blocks = await n2m.pageToMarkdown(page.id)
    const tags = await Promise.all(tagIds.map(async t => getTagNameAndIcon(t)))

    const pageContentsInMarkdown = n2m.toMarkdownString(blocks)
    const fileName = path.join(DIR, getSafeFilenameStringFromPageName(title))

    const pageHeader = buildPageHeader({
      title,
      date,
      tags,
      summary,
      readTime,
      id: page.id,
    })
    const pageContent =
      pageHeader + '\n' + Object.values(pageContentsInMarkdown).join('\n')

    console.log('Writing file: ', fileName)
    await fs.writeFile(fileName, pageContent)
  })
  await Promise.all(tasks)

  console.log('Complete in: ', performance.now() - startTime, 'ms')
}

fetchBlogpostsFromNotionAndWriteThemAsMarkdowninFs()
