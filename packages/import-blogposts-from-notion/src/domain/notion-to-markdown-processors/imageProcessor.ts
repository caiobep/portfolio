import { downloadImageToFilesystem } from '../../ports/output/filesystem/use-cases/downloadImageToFilesystem'
import { generateWebpOptimizedVersionOfImage } from '../images/generateWebpVersionOfImage'
import { BlockTransformer } from './index.types'
import { v4 as uuidv4 } from 'uuid'

export type ImageMetadata = {
  name: string
  url: string
}
export type ImageProcessor = (
  onAddImage: (i: ImageMetadata) => unknown,
) => BlockTransformer
export const imageDownloadProcessor = (dir: string) => async (block, n2m) => {
  const { image } = block as any
  const {
    file: { url },
  } = image

  if (!url) return ''

  const name = uuidv4()
  const imageOnFs = await downloadImageToFilesystem(dir, { name, url })
  await generateWebpOptimizedVersionOfImage(imageOnFs.path)

  const imageCaption = await n2m.blockToMarkdown(image?.caption)

  return `![${imageCaption}](./images/${name}.webp)`
}
export const imageProcessor: ImageProcessor =
  imageProcessor => async (block, n2m) => {
    const { image } = block as any
    const {
      file: { url },
    } = image

    if (!url) return ''

    const name = uuidv4()
    if (imageProcessor) imageProcessor({ name, url })

    const imageCaption = await n2m.blockToMarkdown(image?.caption)

    return `![${imageCaption}](./images/${name}.webp)`
  }
