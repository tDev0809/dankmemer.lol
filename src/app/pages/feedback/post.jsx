import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { format as dateFormat, formatRelative } from 'date-fns';

import '../../assets/styles/pages/feedback/post.scss'
import Logo from 'assets/img/memer.png';

const LOAD_COMMENTS_AMOUNT = 10;
const LABELS = [
    "accepted",
    "implemented",
    "duplicate",
    "denied",
    "invalid"
]

function Post(props) {
    const [post, setPost] = useState(null);
    const [comment, setComment] = useState("");
    const [commentState, setCommentState] = useState("");
    const [comments, setComments] = useState([]);
    const [from, setFrom] = useState(0);
    const [all, setAll] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [headColumn, setHeadColumn] = useState(false);

    const pID = window.location.pathname.split("/")[3];

    const loadComments = async () => {
        axios(`/api/feedback/comments/${pID}?from=${from}&amount=${LOAD_COMMENTS_AMOUNT}`).then(({data}) => {
            setComments([...comments, ...data.comments]);
            setAll(data.all);
        });
    }

    const loadNewComments = async () => {
        setFrom(from + LOAD_COMMENTS_AMOUNT);
    }

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

    const deleteComment = async (id) => {
        if(!confirm("Are you sure you want to remove this comment? This will delete it from the post, like it did ever exist 😭")) return;
        axios.delete(`/api/feedback/comment/${id}`);
        location.reload();
    }

	const postComment = async () => {
		if(!props.loggedIn) {
			return toast.dark(<p><svg viewBox="0 0 16 16" fill="currentColor" style={{display: "inline-block", verticalAlign: "middle", width: "20px", height: "20px", boxSizing: "border-box", margin: "10px", color: "rgb(233, 76, 88)"}}><path fillRule="evenodd" d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path></svg><span style={{ display: "inline-block", verticalAlign: "middle" }}>You need to be logged in!</span></p>, {
				position: "top-right",
				autoClose: 10000,
				hideProgressBar: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				toastId: 'commentState'
			});
		}
		
        if (comment.length < 5 || comment.length > 2000) return;

		toast.dark(<p><svg viewBox="5 5 40 40" fill="currentColor" style={{display: "inline-block", verticalAlign: "middle", width: "20px", height: "20px", boxSizing: "border-box", margin: "10px", color: "rgb(65, 146, 255)"}}><path d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"><animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.5s" repeatCount="indefinite"></animateTransform></path></svg><span style={{ display: "inline-block", verticalAlign: "middle" }}>Submitting your comment.</span></p>, {
			position: "top-right",
			autoClose: 10000,
			hideProgressBar: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			toastId: 'commentState'
		});

		const res = await fetch('/api/feedback/comment', {
      		credentials: 'same-origin',
      		method: 'POST',
      		headers: {
        		'Content-Type': 'application/json'
      		},
      		body: JSON.stringify({
        		comment, id
      		})
    	});

		setCommentState(res.status);
        setComments([...comments, {
            comment: comment,
            createdAt: Date.now(),
            author: {
                id: props.id,
                discriminator: props.discriminator,
                username: props.username,
                developer: props.isAdmin,
                moderator: props.isModerator
            }	
        }]);
        setComment("");
	}

    const changeLabel = (id, label) => {
        axios.patch(`/api/feedback/post/label/${id}?label=${label}`).then(({data}) => {
          const copy = {...post};
          copy.label = label;
          setPost(copy);
        });
        return setDropdownOpen(false);
    }

    useEffect(() => {
		if (commentState === 0) return;
		switch(commentState) {
			case 200:
				toast.update('commentState', {
					render: <p><svg viewBox="0 0 16 16" fill="currentColor" style={{display: "inline-block", verticalAlign: "middle", width: "20px", height: "20px", boxSizing: "border-box", margin: "10px", color: "rgb(50, 211, 139)"}}><path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path></svg><span style={{ display: "inline-block", verticalAlign: "middle" }}>Your comment has been submitted.</span></p>
				});
				break;
			case 401:
				toast.update('commentState', {
					render: <p><svg viewBox="0 0 16 16" fill="currentColor" style={{display: "inline-block", verticalAlign: "middle", width: "20px", height: "20px", boxSizing: "border-box", margin: "10px", color: "rgb(233, 76, 88)"}}><path fillRule="evenodd" d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path></svg><span style={{ display: "inline-block", verticalAlign: "middle" }}>You are not logged in.</span></p>
				});
				break;
			case 403:
				toast.update('commentState', {
					render: <p><svg viewBox="0 0 16 16" fill="currentColor" style={{display: "inline-block", verticalAlign: "middle", width: "20px", height: "20px", boxSizing: "border-box", margin: "10px", color: "rgb(233, 76, 88)"}}><path fillRule="evenodd" d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path></svg><span style={{ display: "inline-block", verticalAlign: "middle" }}>You are banned from posting comments.</span></p>
				});
				break;
			case 406:
				toast.update('commentState', {
					render: <p><svg viewBox="0 0 16 16" fill="currentColor" style={{display: "inline-block", verticalAlign: "middle", width: "20px", height: "20px", boxSizing: "border-box", margin: "10px", color: "rgb(233, 76, 88)"}}><path fillRule="evenodd" d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path></svg><span style={{ display: "inline-block", verticalAlign: "middle" }}>Your account is too new to post a comment.</span></p>
				});
				break;
			case 429:
				toast.update('commentState', {
					render: <p><svg viewBox="0 0 16 16" fill="currentColor" style={{display: "inline-block", verticalAlign: "middle", width: "20px", height: "20px", boxSizing: "border-box", margin: "10px", color: "rgb(245, 170, 10)"}}><path fillRule="evenodd" d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 5zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path></svg><span>You're doing that too often!</span></p>
				});
				break;
			default:
				toast.update('commentState', {
					render: <p><svg viewBox="0 0 16 16" fill="currentColor" style={{display: "inline-block", verticalAlign: "middle", width: "20px", height: "20px", boxSizing: "border-box", margin: "10px", color: "rgb(245, 170, 10)"}}><path fillRule="evenodd" d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 5zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path></svg><span style={{ display: "inline-block", verticalAlign: "middle" }}>An unknown error has occurred.</span></p>
				});
				break;
		}
		setCommentState(0);
	}, [commentState]);
    
    useEffect(() => {
        loadPost();

        window.addEventListener("resize", () => {
            if(document.getElementById("feedback-post-head-details-title").clientHeight >= (window.innerHeight / 5)) return setHeadColumn(true)
            else if(!document.getElementById("feedback-post-head-details-title").clientHeight >= (window.innerHeight / 5)) return setHeadColumn(false); 
            else return setHeadColumn(false)
        });

        return () => {
            window.removeEventListener("resize", () => {
                if(document.getElementById("feedback-post-head-details-title").clientHeight >= (window.innerHeight / 5)) return setHeadColumn(true)
                else if(!document.getElementById("feedback-post-head-details-title").clientHeight >= (window.innerHeight / 5)) return setHeadColumn(false); 
                else return setHeadColumn(false)
            });
        }
    }, []);

    useEffect(() => {
        if(!post) return
        if(document.getElementById("feedback-post-head-details-title").clientHeight >= (window.innerHeight / 5)) setHeadColumn(true)
    }, [post]);

    useEffect(() => {
        loadComments();
    }, [from]);

    return (
        <div id="feedback-post">
            {!post && !props.isLoading &&
                <div style={{
                    textAlign: 'center',
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                <img src={Logo} width={80} style={{ marginBottom: "1vh" }}/>
                <i>Woah, so empty.</i>
            </div>}
            {post &&
            <>
                {window.history.length > 1 &&
                    <p onClick={() => history.back()} className="go-back">
                        <span className="material-icons">arrow_back</span>
                        Go back
                    </p>
                }
                <div id="feedback-post-head" className={headColumn ? "column" : ""}>
                    <div id="feedback-post-head-details">
                        {post.bad && <h5 style={{color: "yellow"}}>This post is only visible to moderators and you.</h5>}
                        <h1 id="feedback-post-head-details-title">{post && post.title}</h1>
                        {post.developerResponse && <span className={"feedback-post-tag developer-response"}>Developer Response</span>}
                        {post.label && post.label.length >= 1 && <span className={"feedback-post-tag " + post.label.split(" ").join("-")}>{post.label.charAt(0).toUpperCase() + post.label.substr(1).toLowerCase()}</span>}
                        <p id="feedback-post-head-details-author">Suggested by {post.author.username}#{post.author.discriminator} at {dateFormat(new Date(post.createdAt), "dd/MM/yy, K:mm:ss aaa")}</p>
                    </div>
                    <div id="feedback-post-head-controls">
                        {props.loggedIn && (props.isAdmin || props.isModerator) &&
                            <div id="feedback-post-head-controls-dropdown">
                                <div id="feedback-post-head-controls-dropdown-container" onClick={() => setDropdownOpen(!dropdownOpen)}>
                                    <span className="icon material-icons-outlined">label</span>
                                    {/*
                                        TODO: (Badosz) Possibly get the label from the post data on load and if it
                                        has one of the LABELS (line 10) make default show it and remove it from LABELS array
                                    */}
                                    <p id="feedback-post-head-controls-dropdown-container-selected">Post label</p>
                                    <span className="right material-icons">expand_more</span>
                                </div>
                                {dropdownOpen ? 
                                    <div id="feedback-post-head-controls-dropdown-options">
                                        {LABELS.map((label) => (
                                            <p key={label} className="feedback-dropdown-item" onClick={() => changeLabel(post._id, label)}>{label.charAt(0).toUpperCase() + label.substr(1).toLowerCase()}</p>
                                        ))}
                                        <p className="feedback-dropdown-item" onClick={() => changeLabel(post._id, "")}>No label</p>
                                    </div>
                                : ''}
                            </div>
                        }
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
                <div id="feedback-post-content">
                    {post.description.split('\n').map(str => <p>{str}</p>)}
                </div>
                <div id="feedback-post-comments">
                    <h2>Comments ({post.comments})</h2>
                    <p id="feedback-post-comments-notice">{props.loggedIn ? `You're signed in as, ${props.username}#${props.discriminator}. Ensure this is the account you want to appear as the comment author.` : 'You are not signed in. Do it to post a comment.'}</p>
                    <div id="feedback-post-comments-form">
                        <textarea 
                            id="feedback-post-comments-ta"
                            maxLength={1024} 
                            onChange={(e) => setComment(e.target.value)} 
                            value={comment}
                            placeholder={"Feedback for this feedback post... feedbackception"}
                        />
                        {
                            (comment.length >= 5 && comment.length <= 1024)
                            ? <button className="feedback-post-comments-submit enabled" onClick={postComment}>Submit</button>
                            : <button className="feedback-post-comments-submit disabled">Submit</button>
                        }
                    </div>
                    <div id="feedback-comments">
                        {comments.map(comment => 
                            <div key={comment._id} className="comment">
                                <div className="comment-content">
                                    <p className={`comment-content-author${comment.author.developer ? " developer" : comment.author.moderator ? " moderator" : ""}`}>
                                        {comment.author.username}#{comment.author.discriminator}
                                        {comment.author.developer ?
                                        <span className="material-icons comment-content-author-badge" title="Dank Memer developer">construction</span>
                                        : comment.author.moderator ?
                                        <span className="material-icons comment-content-author-badge" title="Dank Memer moderator">local_police</span>
                                        : ''} <span className="comment-post-time">{formatRelative(new Date(comment.createdAt), new Date())}</span>
                                    </p>
                                    <p className="comment-content-text">{comment.comment.split('\n').map(str => <p>{str}</p>)}</p>
                                </div>
                                <div className="comment-actions">
                                    {!comment.deleted && props.loggedIn && (props.id === comment.author.id || props.isAdmin || props.isModerator) &&
                                        <div className="comment-actions-delete" onClick={() => deleteComment(comment._id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path><path d="M9 10h2v8H9zm4 0h2v8h-2z"></path></svg>
                                            <p>Delete comment</p>
                                        </div>
                                    }
                                </div>
                                <br/>
                            </div>
                        )}
                        {!all &&
                            <div onClick={loadNewComments} className="load-more">
                                <p>Load more comments...</p>
                            </div>
                        }
                    </div>
                </div>
                <ToastContainer />
            </>}
        </div>
    );
}

export default connect(store => store.login)(Post);