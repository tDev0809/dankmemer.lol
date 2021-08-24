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

    const upvote = async (id) => {
        if (!props.loggedIn) {
			return toast.dark(<p><svg viewBox="0 0 16 16" fill="currentColor" style={{display: "inline-block", verticalAlign: "middle", width: "20px", height: "20px", boxSizing: "border-box", margin: "10px", color: "rgb(233, 76, 88)"}}><path fillRule="evenodd" d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path></svg><span style={{ display: "inline-block", verticalAlign: "middle" }}>You need to be logged in!</span></p>, {
				position: "top-right",
				autoClose: 10000,
				hideProgressBar: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				toastId: 'upvoteState'
			});
		}
        axios.patch(`/api/feedback/post/upvote/${id}`).then(({data}) => {
            const post = posts.find((post) => post._id === id);
            post.upvotes += data.upvote;
            post.upvoted = data.upvote == 1;
            setPosts([...posts]);
        });
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
        window.location.replace("/feedback");
    }

    // TODO: (Badosz) sorting by upvotes, creation date
    // TODO: (Blue) style this page
    return <div style={{width: "70vw", margin: "0 auto"}}>
        <Link to={`/feedback/new`}>
            New Post
        </Link>
        {posts.map(post => 
            <div key={post._id}>    
                <div onClick={() => upvote(post._id)}>{post.upvoted ? "[UNDO UPVOTE]" :"[UPVOTE]"}</div>
                <Link to={`/feedback/p/${post._id}`}>
                    <div>{post.upvotes} upvotes</div>
                    <div>by {post.author.username}</div>
                    <div>{post.title}</div>
                    <div>{post.description}</div>
                    <div>{new Date(post.createdAt).toLocaleString()}</div>
                    <br/>
                </Link>
            </div>
        )}
        {!all && <div onClick={loadNewPosts}>
            Load More Posts
        </div>}
        <ToastContainer />
    </div>
}

export default connect(store => store.login)(FeedbackCategory);