import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const LOAD_POSTS_AMOUNT = 10

function FeedbackCategory(props) {
    let [posts, setPosts] = useState([]);
    let [from, setFrom] = useState(0);
    let [all, setAll] = useState(false);
    let [feedbackCategories, setFeedbackCategories] = useState(null);

    const category = window.location.pathname.split("/")[2];

    const loadPosts = async () => {
        axios(`/api/feedback/posts/${category}?from=${from}&amount=${LOAD_POSTS_AMOUNT}`).then(({data}) => {
            setPosts([...posts, ...data.posts]);
            setAll(data.all);
        });
    }

    const loadNewPosts = async () => {
        setFrom(from + LOAD_POSTS_AMOUNT);
    }

    // TODO: (Badosz) Upvotes
    const upvote = async (id) => {
        console.log(id);
    }

    useEffect(() => {
        loadPosts();
    }, [from]);

    useEffect(() => {
        axios(`/api/feedback/categories`).then((data) => {
            setFeedbackCategories(data.data);
        });
    }, []);


    if (feedbackCategories && !feedbackCategories.includes(category)) {
        window.location.replace("/feedback")
    }

    // TODO: (Badosz) sorting by upvotes, creation date
    // TODO: (Blue) style this page
    // Note: Author has avatar hash, Post has also "createdAt"
    return <div style={{width: "70vw", margin: "0 auto"}}>
        <Link to={`/feedback/new`}>
            New Post
        </Link>
        {posts.map(post => 
            <Link to={`/feedback/p/${post._id}`} key={post._id}>
                <div onClick={() => upvote(post._id)}>[UPVOTE]</div>
                <div>{post.upvotes} upvotes</div>
                <div>by {post.author.username}</div>
                <div>{post.title}</div>
                <div>{post.description}</div>
                <br/>
            </Link>
        )}
        {!all && <div onClick={loadNewPosts}>
            Load More Posts
        </div>}
        <ToastContainer />
    </div>
}

export default connect(store => store.login)(FeedbackCategory);