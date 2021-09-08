import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import createAd from '../../util/createAd';
import '../../assets/styles/pages/feedback/home.scss';

function Home(props) {
    const history = useHistory();
    const [feedbackCategories, setFeedbackCategories] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios(`/api/feedback/categoriesCount`).then((data) => {
            setFeedbackCategories(data.data);
        })
        axios(`/api/feedback/posts/all?from=0&amount=5`).then(({data}) => {
            setPosts([...posts, ...data.posts]);
        });

        createAd('nitropay-feedback-home-top', { sizes: [ [728, 90] ] }, 'desktop');
		createAd('nitropay-feedback-home-top', { sizes: [
			[320, 50],
			[300, 50],
			[300, 250]
		] }, 'mobile');

		createAd('nitropay-feedback-home-bottom', {
			sizes: [
				[728, 90],
				[970, 90],
				[970, 250]
			],
			renderVisibleOnly: true
		}, 'desktop');
		createAd('nitropay-feedback-home-bottom', {
			sizes: [
				[320, 50],
				[300, 50],
				[300, 250]
			],
			renderVisibleOnly: true
		}, 'mobile');
    }, []) 

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

    return (
        <div id="feedback-home">
            <div id="feedback-home-head">
                <h1 id="feedback-home-head-title">Feedback</h1>
                <div id="feedback-home-head-button">
                    <Link id="feedback-home-head-button-create" to="/feedback/new">New post</Link>
                    <span id="feedback-home-head-button-bg"></span>
                </div>
            </div>
            <div id="feedback-home-categories">
                {feedbackCategories && Object.entries(feedbackCategories).map(([category, posts], i) => 
                    <div tabIndex={i + 1} key={category} className="feedback-home-category" onClick={() => history.push(`/feedback/${category}`)}>
                        <h2 className="feedback-home-category-title">{category.charAt(0).toUpperCase() + category.substr(1).toLowerCase()}</h2>
                        <p className="feedback-home-category-posts">{`${posts} post${posts === 1 ? "": "s"}`}</p>
                    </div>
                )}
            </div>
            <div id="nitropay-feedback-home-top" className="nitropay" />
            {posts.map((post, i) => 
                <div key={post._id} className="feedback-post" onClick={() => history.push(`/feedback/p/${post._id}`)}>    
                    <div className="feedback-post-content">
                        <h3>
                            {post.title}
                            <span className={post.developerResponse && "feedback-post-tag developer-response"}>Developer Response</span>
                        </h3>
                        <p className="feedback-post-content-description">{post.description}</p>
                    </div>
                    <div className="feedback-post-stats">
                        <div className="feedback-post-stats-comments">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10" /><path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" /></svg>
                            <p className="feedback-post-stats-comments-count">{post.comments}</p>
                        </div>
                        <div className={post.upvoted ? "feedback-post-stats-button upvoted" : "feedback-post-stats-button"} onClick={(e) => upvote(post._id) && e.stopPropagation()}>
                            {/* using stopPropagation because the parent also has an onClick which would fire otherwise */}
                            {post.upvoted
                                ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14z"></path></svg>
                                : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.781 2.375c-.381-.475-1.181-.475-1.562 0l-8 10A1.001 1.001 0 0 0 4 14h4v7a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-7h4a1.001 1.001 0 0 0 .781-1.625l-8-10zM15 12h-1v8h-4v-8H6.081L12 4.601 17.919 12H15z"></path></svg> 
                            }
                            <p>{post.upvotes}</p>
                        </div>
                    </div>
                </div>
            )}
            <div id="nitropay-feedback-home-bottom" className="nitropay" />
            <ToastContainer />
        </div>
    )
}

export default connect(store => store.login)(Home);