import './App.css';
import React from 'react';
import { useRoutes } from 'react-router-dom'
import ReadPosts from './pages/ReadPosts'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { supabase } from './client';

const App = () => {

  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('Posts')
      .select()
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      setPosts(data);
      // console.log(data);
    }
  };

  // console.log("App.js Parent posts:", posts);
  useEffect(() => {
    fetchPosts();  // Fetch posts when component mounts
  }, []);  // Empty dependency array means this runs once when component mounts

  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element: <ReadPosts data={posts} />
    },
    {
      path: "/edit/:id",
      element: <EditPost data={posts} />
    },
    {
      path: "/new",
      element: <CreatePost />
    }
  ]);

  return (

    <div className="App">

      <div className="header">
        <h1>👍 Bet 1.0</h1>
        <Link to="/"><button className="headerBtn"> Explore Challenges 🔍  </button></Link>
        <Link to="/new"><button className="headerBtn"> Submit Challenge 🏆 </button></Link>
      </div>
      {element}
    </div>

  );
}

export default App;
