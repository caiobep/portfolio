import fs from 'node:fs/promises'
import path from 'node:path'
import { performance } from 'node:perf_hooks'

import { Blogpost } from '../../../../domain'
import { getFsSafeNameFromStr, recordToPageHeaderAdapter } from '../adapters'

export async function createBlogpostFileWriter(
  directory: string,
): Promise<(blogpost: Blogpost) => ReturnType<typeof writeBlogpostInFs>> {
  const dirCleaningTime = performance.now()
  try {
    await fs.rm(directory, { recursive: true, force: true })
    await fs.mkdir(directory)
    await fs.mkdir(path.join(directory, 'images'))
  } catch (ex) {
    console.error(`Could not clean dir ${directory} \r\n ${ex}`)
  }
  console.log('Cleaning dir in: ', performance.now() - dirCleaningTime, 'ms')

  return (blogpost: Blogpost) => writeBlogpostInFs(directory, blogpost)
}

export async function writeBlogpostInFs(
  directory: string,
  blogpost: Blogpost,
): Promise<void> {
  const { content, ...headers } = blogpost
  const fileName = getFsSafeNameFromStr(blogpost.title)
  const postHeader = recordToPageHeaderAdapter(headers)

  const fileContents = `${postHeader} \n ${content}`

  console.log('Writing file: ', fileName + ' to dir: ', directory)

  try {
    await fs.writeFile(path.join(directory, fileName), fileContents)
    console.log('Writing file: ', fileName + ' to dir: ', directory + ' [done]')
  } catch (ex) {
    throw new Error(`Could not write file ${fileName}. \r\n ${ex}`)
  }
}
