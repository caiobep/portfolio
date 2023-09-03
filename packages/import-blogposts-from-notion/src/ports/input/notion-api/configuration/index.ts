import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'
import environment from '../../../../infrastructure/environment'

export const notionApiClient = new Client({
  auth: environment.NOTION_API_KEY,
})

export const createNotionToMarkdownClient = (
  notionClient = notionApiClient,
) => {
  const n2m = new NotionToMarkdown({
    notionClient,
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

  return n2m
}
