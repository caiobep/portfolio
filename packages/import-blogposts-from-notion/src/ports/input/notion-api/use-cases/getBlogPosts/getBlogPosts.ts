import {
  BlogpostPageResponse,
  convertPageObjectToBlogpostHeader,
} from '../../adapters/convertPageObjectToBlogpost'
import { notionApiClient } from '../../configuration'
import { QueryDatabaseResponse } from '@notionhq/client/build/src/api-endpoints'
import environment from '../../../../../infrastructure/environment'
import { Blogpost } from '../../../../../domain'

export async function getBlogpostPages(
  startCursor?: string,
): Promise<QueryDatabaseResponse> {
  try {
    const items = await notionApiClient.databases.query({
      database_id: environment.NOTION_BLOG_DATABASE,
      ...(startCursor && { start_cursor: startCursor }),
      filter: {
        property: 'Tags',
        relation: { contains: environment.NOTION_BLOG_TAG },
      },
    })

    return items
  } catch (e) {
    throw new Error(e)
  }
}

export type GetAllBlogpostPageMetadataReturn = Omit<
  Blogpost,
  'content' | 'tags'
> & { tagIds: string[] }

export async function getAllBlogpostPageMetadata(): Promise<
  Array<GetAllBlogpostPageMetadataReturn>
  > {
  const pagesInMemory: BlogpostPageResponse[] = []

  let nextCursor: string | null = null
  do {
    const pages = await getBlogpostPages(nextCursor)
    pagesInMemory.push(...(pages?.results as BlogpostPageResponse[]))
    nextCursor = pages?.next_cursor || null
  } while (nextCursor !== null)

  return pagesInMemory.map(s => ({
    ...convertPageObjectToBlogpostHeader(s),
    tagIds: s?.properties?.Tags?.relation.map(t => t?.id),
  }))
}
