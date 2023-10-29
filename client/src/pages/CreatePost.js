import React, { useState } from 'react';
import './CreatePost.css'
import { supabase } from '../client'

const CreatePost = () => {

    // initialize the state variables for the form fields:
    const [post, setPost] = useState({ title: '', author: '', description: '' });


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPost({
            ...post,
            [name]: value
        });
    };


    const createPost = async (event) => {
        event.preventDefault();
        const { data, error } = await supabase
            .from('Posts')
            .insert({ title: post.title, author: post.author, description: post.description })
            .select();

        if (error) {
            console.error('Error inserting:', error);
        } else {
            console.log('Insert:', data);
        }

        window.location = "/";
    };


    return (
        <div>
            <form onSubmit={createPost}>
                <label for="title">Title</label> <br />
                <input type="text" id="title" name="title" value={post.title} onChange={handleInputChange} /><br />
                <br />

                <label for="author">Author</label><br />
                <input type="text" id="author" name="author" value={post.author} onChange={handleInputChange} /><br />
                <br />

                <label for="description">Description</label><br />
                <textarea rows="5" cols="50" id="description" name="description" value={post.description} onChange={handleInputChange}>
                </textarea>
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default CreatePost