import { NotionToMarkdown } from 'notion-to-md'
import environment from '../../../../infrastructure/environment'
import { Client } from '@notionhq/client'
import { BlockType } from 'notion-to-md/build/types'
import { BlockTransformer } from '../../../../domain/notion-to-markdown-processors'

export const notionApiClient = new Client({
  auth: environment.NOTION_API_KEY,
})

export const createNotionToMarkdownClient = (
  processors?: Partial<Record<BlockType, BlockTransformer>>,
  notionClient = notionApiClient,
) => {
  const n2m = new NotionToMarkdown({
    notionClient,
    config: {
      parseChildPages: true,
    },
  })

  if (processors) {
    Object.entries(processors).forEach(([blockType, processor]) => {
      n2m.setCustomTransformer(blockType, s => processor(s, n2m))
    })
  }

  return n2m
}
