export default function Post({ posts }: { posts: string[] }) {
  return <div>{posts?.join(',')}</div>
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await fetch('http://127.0.0.1:3000/api/post/123')
  const posts = await res.json()
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts: posts.postList,
    },
  }
}
