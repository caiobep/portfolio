import { retrieveAllBlogpostsAndWriteInFolder } from './use-cases/retrieveAllBlogpostsAndWriteInFolder'

async function cli(args: string[]) {
  const folder = args.at(-1)
  console.log('Writing to: ', folder)
  await retrieveAllBlogpostsAndWriteInFolder(folder)
}

cli(process.argv).then(console.log).catch(console.error)
