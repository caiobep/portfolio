import { createNotionToMarkdownClient } from '../configuration'

export async function getPageContentsInMarkdown(
  postId: string,
  notionToMarkdownClient: ReturnType<typeof createNotionToMarkdownClient>,
) {
  const pageContents = await notionToMarkdownClient.pageToMarkdown(postId)
  const contentInMd = notionToMarkdownClient.toMarkdownString(pageContents)

  return Object.values(contentInMd).join('\n')
}

export async function createNotionMarkdownExporter() {
  const notionMarkdownClient = createNotionToMarkdownClient()

  return (p: string) => getPageContentsInMarkdown(p, notionMarkdownClient)
}
