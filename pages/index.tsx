import type { NextPage } from 'next'
import Link from 'next/link'
import { getPosts, NotionPage } from '../lib/notion-api'

interface HomeProps {
  posts: NotionPage[]
}

const Home: NextPage<HomeProps> = (props) => {
  return (
    <>
      <h1>Blog</h1>
      {props.posts.map((post) => (
        <Link href={`/posts/${post.url}`} key={post.id}>
          <a>
            <div key={post.id}>
              <h3> {post.title} </h3>
            </div>
            <span> {new Date(post.createdAt).toLocaleDateString()} </span>
          </a>
        </Link>
      ))}
    </>
  )
}

export const getStaticProps = async () => {
  const posts = await getPosts()

  return { props: { posts } }
}

export default Home
