import { createBlogpostFileWriter } from '../ports/output/filesystem/use-cases'
import {
  createNotionMarkdownExporter,
  getAllBlogpostPageMetadata,
  getTagNameAndIcon,
} from '../ports/input/notion-api/use-cases'
import { downloadImageToFilesystem } from '../ports/output/filesystem/use-cases/downloadImageToFilesystem'
import { generateWebpOptimizedVersionOfImage } from '../domain/images/generateWebpVersionOfImage'
import path from 'path'
import {
  imageDownloadProcessor,
  imageProcessor,
} from '../domain/notion-to-markdown-processors/imageProcessor'
import { videoProcessor } from '../domain/notion-to-markdown-processors/videoProcessor'
import { embedProcessor } from '../domain/notion-to-markdown-processors/embedProcessor'

/**
 * Fetch all blog posts from Notion and writes them as markdown files in a folder.
 * @param {string} destinationPath - The path to the folder where the markdown files will be written.
 **/

export async function retrieveAllBlogpostsAndWriteInFolder(
  destinationPath: string,
) {
  const blogpostPages = await getAllBlogpostPageMetadata()
  const writeBlogpostFile = await createBlogpostFileWriter(destinationPath)
  const imageDownloadDir = path.join(destinationPath, 'images')

  const getPageContentInMd = await createNotionMarkdownExporter({
    image: imageDownloadProcessor(imageDownloadDir),
    embed: embedProcessor,
    video: videoProcessor,
  })

  const tasks = blogpostPages.map(async page => {
    const tags = await Promise.all(page.tagIds.map(getTagNameAndIcon))
    const content = await getPageContentInMd(page.id)

    try {
      await writeBlogpostFile({ ...page, tags, content })
    } catch (err) {
      console.error(err)
    }
  })

  await Promise.all(tasks)
}
