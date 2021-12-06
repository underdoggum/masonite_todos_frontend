import Post from "../components/Post";


const AllPosts = props => {
  

  return (
    // for each post in the array, render a post component
    props.posts.map(post => {
      return (
        <Post key={post.id} post={post} />
      )
    })
  )
}


export default AllPosts;
