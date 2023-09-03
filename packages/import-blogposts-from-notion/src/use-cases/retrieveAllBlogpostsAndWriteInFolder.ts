import { createBlogpostFileWriter } from '../ports/output/filesystem/use-cases'
import {
  createNotionMarkdownExporter,
  getAllBlogpostPageMetadata,
  getTagNameAndIcon,
} from '../ports/input/notion-api/use-cases'

/**
 * Fetch all blog posts from Notion and writes them as markdown files in a folder.
 * @param {string} destinationPath - The path to the folder where the markdown files will be written.
 **/
export async function retrieveAllBlogpostsAndWriteInFolder(
  destinationPath: string,
) {
  const blogpostPages = await getAllBlogpostPageMetadata()
  const getPageContentInMd = await createNotionMarkdownExporter()
  const writeBlogpostFile = await createBlogpostFileWriter(destinationPath)

  const tasks = blogpostPages.map(async page => {
    const tags = await Promise.all(page.tagIds.map(getTagNameAndIcon))
    const content = await getPageContentInMd(page.id)

    await writeBlogpostFile({ ...page, tags, content })
  })

  await Promise.all(tasks)
}
