import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function Post(props) {
    let [post, setPost] = useState(null);
    const id = window.location.pathname.split("/")[3];
    
    const loadPost = async () => {
        axios(`/api/feedback/post/${id}`).then(({data}) => {
            setPost(data.post);
        });
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
            post.upvotes += data.upvote;
            post.upvoted = data.upvote == 1;
            setPost({...post});
        });
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
            <div onClick={() => upvote(post._id)}>{post.upvoted ? "[UNDO UPVOTE]" :"[UPVOTE]"}</div>
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
        <ToastContainer />
    </div>
}

export default connect(store => store.login)(Post);