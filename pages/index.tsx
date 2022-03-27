import type { NextPage } from 'next'
import Link from 'next/link'
import { getPosts } from '../lib/notion-api'

interface HomeProps {
  posts: string
}

const Home: NextPage<HomeProps> = (props) => {
  return (
    <>
      <h1> Here's a random breaking bad quote </h1>
      {props.posts.map(post => (
        <Link href={`/posts/${post.url}`} key={post.id}>
          <a>
            <div key={post.id}>
              <h3> {post.title} </h3>
            </div>
            <span> {new Date(post.createdAt).toLocaleDateString()} </span>
          </a>
        </Link>
      ))}
      <pre>
        {JSON.stringify(props.posts)}
      </pre>
    </>
  )
}

export const getStaticProps = async () => {
  const posts = await getPosts()

  return { props: { posts } }
}

export default Home
