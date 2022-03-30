import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head'
import { NotionPage } from 'notion-page-to-html/dist/main/protocols/notion-page';
import { getAllPostIds, getPostContent, getPosts, Page } from '../../lib/notion-api'
import utilStyles from '../../styles/utils.module.css'

interface PostData {
  postData: Page
}

const Post: NextPage<PostData> = ({ postData }) => {
  return (
    <>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}> {postData.title} </h1>
        <div className={utilStyles.lightText} >
          <span> {postData.date}</span>
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.htmlContent }} />
      </article>
    </>
  )
}

export async function getStaticPaths(): Promise<{ paths: { params: { id: string } }[]; fallback: boolean }> {
  const paths = (await getAllPostIds()).map(id => ({
    params: { id }
  }))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }: { params: { id: string } }): Promise<{ props: { postData: Page } }> {
  const posts = await getPosts()
  const selectedPost = posts.find(post => post.url === params.id)
  const postData = await getPostContent(selectedPost?.id as string)

  return {
    props: {
      postData
    }
  }
}


export default Post
