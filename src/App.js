// Import components
import AllPosts from './pages/AllPosts';
import SinglePost from './pages/SinglePost';
import Form from './pages/Form';

// Import hooks
import { useState, useEffect } from "react";

// Import Router 6 component (they changed Router --> Route, Switch --> Routes when going from Router 5 to Router 6)
import { Route, Routes, Link, useNavigate } from "react-router-dom";


import './App.css';

function App() {

  //////////////////////////////////////////////////
  // Style Objects
  //////////////////////////////////////////////////
  const h1 = {
    textAlign: "center",
    margin: "10px"
  }

  const button = {
    backgroundColor: "navy",
    display: "block",
    margin: "auto"
  }


  //////////////////////////////////////////////////
  // State and other variables
  //////////////////////////////////////////////////
  const navigate = useNavigate();
  
  // Heroku URL
  // Note: the trailing slash is included because this url is used for making API calls, not 
  const url = "https://masonite-todos-backend.herokuapp.com/todos/";

  // State to hold list of posts
  const [posts, setPosts] = useState([]);

  // an empty todo for initializing the create form
  const nullTodo = {
    subject: "",
    details: ""
  }

  const [targetTodo, setTargetTodo] = useState(nullTodo);


  //////////////////////////////////////////////////
  // Functions
  //////////////////////////////////////////////////
  // function to get list of todos from API
  const getTodos = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setPosts(data);
  }

  // function to add todos
  const addTodos = async newTodo => {
    await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTodo)
    })
    // update list of todos
    getTodos();
  }

  // select a todo to edit
  const getTargetTodo = todo => {
    setTargetTodo(todo)
    navigate("/edit")
  }

  // update todo for our handleSubmit prop
  const updateTodo = async todo => {
    await fetch(url + todo.id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo)
    })
    // update todos
    getTodos();
  }

  // delete a todo
  const deleteTodo = async todo => {
    await fetch(url + todo.id, {
      method: "delete"
    })
    getTodos();
    navigate("/");
  }


  //////////////////////////////////////////////////
  // useEffects
  //////////////////////////////////////////////////
  useEffect(() => {
    getTodos();
  }, [])


  //////////////////////////////////////////////////
  // Returned JSX
  //////////////////////////////////////////////////
  return (
    <div>
      <h1 style={h1}>My Todo List</h1>
      <Link to="/new"><button style={button}>Create New Todo</button></Link>
      <Routes>
        <Route path="/" element={<AllPosts posts={posts} />} />
        <Route path="/post/:id" element={
          <SinglePost
            posts={posts}
            edit={getTargetTodo}
            deleteTodo={deleteTodo}
          />}
        />
        <Route path="/new" element={<Form
          initialTodo={nullTodo}
          handleSubmit={addTodos}
          buttonLabel="Create Todo"
        />} />
        <Route path="/edit" element={<Form
          initialTodo={targetTodo}
          handleSubmit={updateTodo}
          buttonLabel="Update Todo"
        />} />
      </Routes>
    </div>
  );
}


export default App;
