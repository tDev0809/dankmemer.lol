import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as axios from 'axios';
import { Link } from 'react-router-dom';

function Post(props) {
    let [post, setPost] = useState(null);
    const id = window.location.pathname.split("/")[3];
    
    const loadPost = async () => {
        axios(`/api/feedback/post/${id}`).then(({data}) => {
            setPost(data.post);
        });
    }

    const upvote = async (id) => {

    }

    const del = async (id) => {
        axios.delete(`/api/feedback/post/${id}`);
        window.location.replace(`/feedback/${post.category}`);
    }

    
    useEffect(() => {
        loadPost();
    }, []);
    
    
    // TODO: (Blue) style this page
    return <div style={{width: "70vw", margin: "0 auto"}}>
        {post && <div>
            <div onClick={() => upvote(post._id)}>[UPVOTE]</div>
            <div>{post.upvotes} upvotes</div>
            <div>by {post.author.username}</div>
            <div>{post.title}</div>
            <div>{post.description}</div>
            <div>{new Date(post.createdAt).toLocaleString()}</div>
            {/* // TODO: (Blue) confirmation? */}
            { (props.loggedIn && (props.id === post.author.id || props.isAdmin || props.isModerator)) &&
                <div onClick={() => del(post._id)} style={{color: "red"}}>[DELETE]</div>
            }
        </div>}
    </div>
}

export default connect(store => store.login)(Post);