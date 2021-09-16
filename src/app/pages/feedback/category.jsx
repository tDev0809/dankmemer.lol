import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import * as axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useHistory } from 'react-router-dom';

import '../../assets/styles/pages/feedback/category.scss';
import '../../assets/styles/components/feedbackPost.scss';
import Logo from 'assets/img/memer.png';

const LOAD_POSTS_AMOUNT = 25;
const LABEL_FILTERS = [
    "all posts",
    "accepted",
    "implemented",
    // "developer response",
    "duplicate",
    "denied"
];

function FeedbackCategory(props) {
    const history = useHistory();
    const { current: category } = useRef(window.location.pathname.split("/")[2])
    const [posts, setPosts] = useState([]);
    const [mobile, setMobile] = useState(window.innerWidth <= 560)
    const [all, setAll] = useState(false);
    const [feedbackCategories, setFeedbackCategories] = useState(null);
    const [sorting, setSorting] = useState("Hot");
    const [filter, setFilter] = useState("all posts");
    const [filterOpen, setFilterOpen] = useState(false);
    const [mobileOptions, setMobileOptions] = useState(false);
    const firstUpdate = useRef(true);

    const loadPosts = async (newList = false) => {
        axios(`/api/feedback/posts/${category}?from=${newList ? 0 : posts.length}&amount=${LOAD_POSTS_AMOUNT}&sorting=${sorting}&filter=${filter}`).then(({data}) => {
            if (newList) {
                setPosts([...data.posts]);
            } else {
                setPosts([...posts, ...data.posts]);
            }
            setAll(data.all);
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
            const post = posts.find((post) => post._id === id);
            post.upvotes += data.upvote;
            post.upvoted = data.upvote == 1;
            setPosts([...posts]);
        });
    }
    
    useEffect(() => {
        loadPosts(true)
        return setFilterOpen(false);
    }, [filter, sorting])

    useEffect(() => {
        axios(`/api/feedback/categories`).then((data) => {
            setFeedbackCategories(data.data);
        });

        window.addEventListener("resize", () => {
            if(window.innerWidth <= 560) return setMobile(true);
            else if(!window.innerWidth <= 560) return setMobile(false);
        });

        return () => {
            window.removeEventListener("resize", () => {
                if(window.innerWidth <= 560) return setMobile(true);
                else if(!window.innerWidth <= 560) return setMobile(false);
            });
        }
    }, []);

    if (feedbackCategories && !feedbackCategories.includes(category)) {
        window.location.replace("/feedback");
    }

    const SortingButton = ({ icon, label }) => {
        return <div 
            id={mobile ? "feedback-category-sorting-mobile-button" : "feedback-category-sorting-desktop-button" }
            className={label == sorting ? "active" : ""}
            onClick={() => setSorting(label)}>
            <span className="material-icons">{icon}</span>
            <span id={mobile ? "feedback-category-sorting-mobile-button-label" : "feedback-category-sorting-desktop-button-label"}>{label}</span>
        </div> 
    }

    // TODO: (Badosz) sorting by upvotes, creation date
    return (
        <div id="feedback-category">
            <div id="feedback-category-head">
                <h1 id="feedback-category-head-title">{category.replace(category[0], category[0].toUpperCase()).replaceAll("_", " ")} feedback</h1>
                <div id="feedback-category-head-button">
                    <Link id="feedback-category-head-button-create" to="/feedback/new">New post</Link>
                    <span id="feedback-category-head-button-bg"></span>
                </div>
            </div>
            {!mobile ?
                <div id="feedback-category-sorting-desktop">
                    <SortingButton
                        icon="local_fire_department"
                        label="Hot"
                    />
                    <SortingButton
                        icon="trending_up"
                        label="Top"
                    />
                    <SortingButton
                        icon="star"
                        label="New"
                    />
                    <SortingButton
                        icon="restore"
                        label="Old"
                    />
                    <div className="sorting-separator"/>
                    <div id="feedback-category-sorting-desktop-button" className="filter" title="Filter posts based on their label">
                        <div id="filter-button" onClick={() => setFilterOpen(!filterOpen)}>
                            <span className="material-icons-outlined">filter_alt</span>
                            <span id="feedback-category-sorting-button-label">{filter.charAt(0).toUpperCase() + filter.substr(1).toLowerCase()}</span>
                        </div>
                        {filterOpen &&
                            <div id="feedback-category-filter-options">
                                {LABEL_FILTERS.map(labelFilter => (
                                    <p key={filter} onClick={() => setFilter(labelFilter)}>{labelFilter.charAt(0).toUpperCase() + labelFilter.substr(1).toLowerCase()}</p>
                                ))}
                            </div>
                        }
                    </div> 
                </div>
                :
                <div id="feedback-category-sorting-mobile">
                    <div 
                        id="feedback-category-sorting-mobile-button-options"
                        className={mobileOptions ? "active" : ""}
                        onClick={() => { setMobileOptions(!mobileOptions); setFilterOpen(false); }}
                    >
                        <span className="material-icons">more_horiz</span>
                        <span id="feedback-category-sorting-button-label">Options</span>
                    </div>
                    {mobileOptions &&
                        <div id="feedback-category-sorting-mobile-buttons">
                            <SortingButton
                                icon="local_fire_department"
                                label="Hot"
                            />
                            <SortingButton
                                icon="trending_up"
                                label="Top"
                            />
                            <SortingButton
                                icon="star"
                                label="New"
                            />
                            <SortingButton
                                icon="restore"
                                label="Old"
                            />
                            <div id="feedback-category-sorting-mobile-button" className="filter" title="Filter posts based on their label">
                                <div id="filter-button" onClick={() => setFilterOpen(!filterOpen)}>
                                    <span className="material-icons-outlined">filter_alt</span>
                                    <span id="feedback-category-sorting-mobile-button-label">{filter.charAt(0).toUpperCase() + filter.substr(1).toLowerCase()}</span>
                                </div>
                                {filterOpen &&
                                    <div id="feedback-category-filter-options-mobile">
                                        {LABEL_FILTERS.map(labelFilter => (
                                            <p key={filter} onClick={() => setFilter(labelFilter)}>{labelFilter.charAt(0).toUpperCase() + labelFilter.substr(1).toLowerCase()}</p>
                                        ))}
                                    </div>
                                }
                            </div>
                        </div>
                    }
                </div>
            }
            {posts.length === 0 && 
                // TODO: (Blue) move to scss?
                <div style={{ textAlign: 'center', display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <img src={Logo} width={80} style={{marginBottom: "1vh"}}/>
                    <i>Woah, so empty.</i>
                </div>
            }
            {posts.map((post, i) => 
                <div key={post._id} className="feedback-post" onClick={() => history.push(`/feedback/p/${post._id}`)}>    
                    <div className="feedback-post-content">
                        <h3 className="feedback-post-content-title">
                            <p>{post.title}</p>
                            {post.developerResponse && <span className={"feedback-post-tag developer-response"}>Developer Response</span>}
                            {post.label && post.label.length >= 1 && <span className={"feedback-post-tag " + post.label.split(" ").join("-")}>{post.label.charAt(0).toUpperCase() + post.label.substr(1).toLowerCase()}</span>}
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
            {!all && <p onClick={() => loadPosts()} id="feedback-category-more">
                Load More Posts
            </p>}
            <ToastContainer />
        </div>
    );
}

export default connect(store => store.login)(FeedbackCategory);