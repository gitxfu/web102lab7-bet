import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client'; // Import Supabase client
import './EditPost.css';

const EditPost = ({ data: posts }) => {

    const { id } = useParams();

    // If post is initialized as {}, then post.title, post.author, and post.description will all be undefined, but they won't cause the program to crash.
    const [post, setPost] = useState({});


    useEffect(() => {
        const fetchedPost = posts.find(item => item.id.toString() === id);
        // const fetchedPost = posts.filter(item => item.id.toString() === id)[0];
        //  finds the first post in posts where item.id is strictly equal to id and assigns that to fetchedPost
        setPost(fetchedPost);
    }, [posts, id]);
    // Anytime posts or id changes, useEffect will run again.


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPost({
            ...post,
            [name]: value
        });
    };

    const updatePost = async (event) => {
        event.preventDefault();
        await supabase
            .from('Posts')
            .update({ title: post.title, author: post.author, description: post.description })
            .eq('id', id);

        window.location = '/';
    };

    const deletePost = async (event) => {
        event.preventDefault();

        await supabase
            .from('Posts')
            .delete()
            .eq('id', id);

        window.location = "/";
    }


    return (
        <div>
            {post ?
                (<form onSubmit={updatePost}>
                    <label htmlFor="title">Title</label> <br />
                    <input type="text" id="title" name="title" value={post.title} onChange={handleInputChange} /><br />
                    <br />

                    <label htmlFor="author">Author</label><br />
                    <input type="text" id="author" name="author" value={post.author} onChange={handleInputChange} /><br />
                    <br />

                    <label htmlFor="description">Description</label><br />
                    <textarea rows="5" cols="50" id="description" value={post.description} onChange={handleInputChange}>
                    </textarea>
                    <br />
                    <input type="submit" value="Submit" />
                    <button className="deleteButton" onClick={deletePost}>Delete</button>
                </form>) : (<div>Loading...</div>)}
        </div>
    )
}

// In React, the for attribute should be replaced with htmlFor when specifying labels for input elements. 
// This is because for is a reserved word in JavaScript, and React elements are written in JavaScript.

export default EditPost