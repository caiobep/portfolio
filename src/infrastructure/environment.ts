const getEnvOrDie = (key: string): string => {
  const value = process.env[key]
  if (!value) {
    throw new Error(`Missing env var: ${key}`)
  }
  return value
}

export const environment = {
  NOTION_API_KEY: getEnvOrDie('NOTION_API_KEY'),
  NOTION_BLOG_DATABASE: getEnvOrDie('NOTION_BLOG_DATABASE'),
  NOTION_BLOG_TAG: getEnvOrDie('NOTION_BLOG_TAG')
}

export default environment
