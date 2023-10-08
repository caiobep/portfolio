import { BlockTransformer } from './index.types'

export const videoProcessor: BlockTransformer = async block => {
  const {
    video: {
      external: { url },
    },
  } = block as any

  if (url?.includes('youtube')) {
    const embedUrl = url.replace('watch?v=', 'embed/')
    return `<iframe src="${embedUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
  }

  return ''
}
