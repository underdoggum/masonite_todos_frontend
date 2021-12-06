import { Link, useParams } from "react-router-dom";


const SinglePost = ({ posts, edit, deleteTodo }) => {
  
  // get the params from the URL
  const params = useParams();
  const id = parseInt(params.id);

  // find the particular post the user wants to see based on the param
  const post = posts.find(p => p.id === id);

  //////////////////////////////////////////////////
  // Style Objects
  //////////////////////////////////////////////////
  const div = {
    textAlign: "center",
    border: "3px solid green",
    width: "80%",
    margin: "30px auto"
  }


  return (
    <div style={div}>
      <h1>{post?.subject}</h1>
      <h2>{post?.details}</h2>
      <button onClick={() => deleteTodo(post)}>Delete</button>
      <button onClick={() => edit(post)}>Edit</button>
      <Link to="/">
        <button>Go back</button>
      </Link>
    </div>
  )
}


export default SinglePost;
