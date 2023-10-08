import { BlockTransformer } from './index.types'

export const embedProcessor: BlockTransformer = async (block, n2m) => {
  const { embed } = block as any
  if (!embed?.url) return ''

  return `<figure>
    <iframe src="${embed?.url}"></iframe>
    <figcaption>${await n2m.blockToMarkdown(embed?.caption)}</figcaption>
  </figure>`
}
