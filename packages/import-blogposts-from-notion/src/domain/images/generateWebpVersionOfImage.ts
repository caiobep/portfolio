import sharp from 'sharp'

export function generateWebpOptimizedVersionOfImage(rawImagePath: string) {
  return new Promise((resolve, reject) => {
    sharp(rawImagePath)
      .toFormat('webp')
      .toFile(rawImagePath.replace('.png', '.webp'), (err, info) => {
        if (err) reject(err)
        resolve(info)
      })
  })
}
