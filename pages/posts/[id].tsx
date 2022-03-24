import Head from 'next/head'
import { getAllPostIds, getPostContent, getPosts } from '../../lib/notion-api'
import utilStyles from '../../styles/utils.module.css'

export default function Post({ postData }) {
  return (
    <>
      <Head>
        <title>{postData.title} </title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl} > {postData.title} < /h1>
          <div className={utilStyles.lightText} >
            <span> {postData.date}</span>
          </div>
          <div dangerouslySetInnerHTML={{ __html: postData.html }} />
      </article>
    </>
  )
}

export async function getStaticPaths() {
  const paths = (await getAllPostIds()).map(id => ({
    params: { id }
  }))

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const posts = await getPosts()
  const selectedPost = posts.find(post => post.url === params.id)
  const postData = await getPostContent(selectedPost.notionUrl)

  return {
    props: {
      postData
    }
  }
}

