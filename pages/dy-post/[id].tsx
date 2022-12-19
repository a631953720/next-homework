import { useRouter } from "next/router"

export default function Post({ posts }: { posts: string[] }) {
  const router = useRouter();
  return <div>id: {router.query.id} postList: {posts?.join(',')}</div>
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  // Call an external API endpoint to get posts
  const res = await fetch(`http://127.0.0.1:3000/api/post/${params.id}`)
  const posts = await res.json()
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts: posts.postList,
    },
  }
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch('http://127.0.0.1:3000/api/post')
  const posts = await res.json() as {
    postIdList: string[];
  };

  // Get the paths we want to pre-render based on posts
  const paths = posts.postIdList.map((id: string) => ({
    params: { id },
  }))

  console.log('allows id:', posts.postIdList);

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}
