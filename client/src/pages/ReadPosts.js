import React, { useState, useEffect } from 'react';
import Card from '../components/Card';

const ReadPosts = ({ data: posts }) => {
// const ReadPosts = (props) => {

//     const [posts, setPosts] = useState([]);
    
//     useEffect(() => {
//         setPosts(props.data);
//         console.log(props);
//     }, [props]);
    
    return (
        <div className="ReadPosts">
            {
                posts && posts.length > 0 ?
                posts.map((post,index) => 
                   <Card key={post.id} id={post.id} title={post.title} author={post.author} description={post.description}/>
                ) : <h2>{'No Challenges Yet 😞'}</h2>
            }
        </div>  
    )
}

export default ReadPosts;