import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import createAd from '../../util/createAd';
import '../../assets/styles/pages/feedback/post.scss'

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

    const deletePost = async (id) => {
        if(!confirm("Are you sure you want to delete this post? You will not be able to get anything back once it is gone.")) return;
        axios.delete(`/api/feedback/post/${id}`);
        window.location.replace(`/feedback/${post.category}`);
    }

    
    useEffect(() => {
        loadPost();

        createAd('nitropay-feedback-post-top', { sizes: [ [728, 90] ] }, 'desktop');
		createAd('nitropay-feedback-post-top', { sizes: [
			[320, 50],
			[300, 50],
			[300, 250]
		] }, 'mobile');

		createAd('nitropay-feedback-post-bottom', {
			sizes: [
				[728, 90],
				[970, 90],
				[970, 250]
			],
			renderVisibleOnly: true
		}, 'desktop');
		createAd('nitropay-feedback-post-bottom', {
			sizes: [
				[320, 50],
				[300, 50],
				[300, 250]
			],
			renderVisibleOnly: true
		}, 'mobile');
    }, []);
    
    
    // TODO: (Blue) style this page
    return (
        <div id="feedback-post">
            {post &&
            <>
                <div id="feedback-post-head">
                    <div id="feedback-post-head-details">
                        <h1 id="feedback-post-head-details-title">{post && post.title}</h1>
                        <p id="feedback-post-head-details-author">Suggested by {post.author.username}#{post.author.discriminator} at {new Date(post.createdAt).toLocaleString().split(",")[1].split(":").slice(0,2).join(":")}{new Date(post.createdAt).toLocaleString().split(",")[1].split(" ").pop()} {new Date(post.createdAt).toLocaleString().split(",")[0]}</p>
                    </div>
                    <div id="feedback-post-head-controls">
                        {props.loggedIn && (props.id === post.author.id || props.isAdmin || props.isModerator) &&
                            <div className="delete" onClick={() => deletePost(post._id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svg>
                                <p>Delete post</p>
                            </div>
                        }
                        <div className={post.upvoted ? "feedback-button upvote upvoted" : "feedback-button upvote"} onClick={() => upvote(post._id)}>
                            {post.upvoted
                                ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14z"></path></svg>
                                : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10zM15 12h-1v8h-4v-8H6.081L12 4.601 17.919 12H15z"></path></svg> 
                            }
                            <p>{post.upvotes}</p>
                        </div>
                    </div>
                </div>
                <div id="nitropay-feedback-post-top" className="nitropay" />
                <div id="feedback-post-content">
                    <p>{post.description}</p>
                </div>
                <div id="nitropay-feedback-post-bottom" className="nitropay" />
                <ToastContainer />
            </>}
        </div>
    );
}

export default connect(store => store.login)(Post);