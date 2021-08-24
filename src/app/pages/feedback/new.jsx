import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function New(props) {
    const [feedbackCategories, setFeedbackCategories] = useState(null);

    useEffect(() => {
        axios(`/api/feedback/categories`).then((data) => {
            setFeedbackCategories(data.data);
        });
    }, []);

    let [description, setDescription] = useState("");
    let [title, setTitle] = useState("");
    let [category, setCategory] = useState("items");
    let [postState, setPostState] = useState(0);
	let [postID, setPostID] = useState(null);

	const postFeedback = async () => {
		if(!props.loggedIn) {
			return toast.dark(<p><svg viewBox="0 0 16 16" fill="currentColor" style={{display: "inline-block", verticalAlign: "middle", width: "20px", height: "20px", boxSizing: "border-box", margin: "10px", color: "rgb(233, 76, 88)"}}><path fillRule="evenodd" d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path></svg><span style={{ display: "inline-block", verticalAlign: "middle" }}>You need to be logged in!</span></p>, {
				position: "top-right",
				autoClose: 10000,
				hideProgressBar: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				toastId: 'feedbackState'
			});
		}
		
        if (description.length < 20 || description.length > 2000) return;
		if (title.length < 3 || title.length > 50) return;


		toast.dark(<p><svg viewBox="5 5 40 40" fill="currentColor" style={{display: "inline-block", verticalAlign: "middle", width: "20px", height: "20px", boxSizing: "border-box", margin: "10px", color: "rgb(65, 146, 255)"}}><path d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"><animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.5s" repeatCount="indefinite"></animateTransform></path></svg><span style={{ display: "inline-block", verticalAlign: "middle" }}>Submitting your feedback.</span></p>, {
			position: "top-right",
			autoClose: 10000,
			hideProgressBar: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			toastId: 'feedbackState'
		});


		const res = await fetch('/api/feedback/post', {
      		credentials: 'same-origin',
      		method: 'POST',
      		headers: {
        		'Content-Type': 'application/json'
      		},
      		body: JSON.stringify({
        		description, title, category
      		})
    	});

		setPostID((await res.json()).id);
		setPostState(res.status);
	}

	useEffect(() => {
		if (postState === 0) return;
		switch(postState) {
			case 200:
                window.location.replace(`/feedback/p/${postID}`)
				break;
			case 401:
				toast.update('feedbackState', {
					render: <p><svg viewBox="0 0 16 16" fill="currentColor" style={{display: "inline-block", verticalAlign: "middle", width: "20px", height: "20px", boxSizing: "border-box", margin: "10px", color: "rgb(233, 76, 88)"}}><path fillRule="evenodd" d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path></svg><span style={{ display: "inline-block", verticalAlign: "middle" }}>You are not logged in.</span></p>
				});
				break;
			case 429:
				toast.update('feedbackState', {
					render: <p><svg viewBox="0 0 16 16" fill="currentColor" style={{display: "inline-block", verticalAlign: "middle", width: "20px", height: "20px", boxSizing: "border-box", margin: "10px", color: "rgb(245, 170, 10)"}}><path fillRule="evenodd" d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 5zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path></svg><span>You're doing that too often!</span></p>
				});
				break;
			default:
				toast.update('feedbackState', {
					render: <p><svg viewBox="0 0 16 16" fill="currentColor" style={{display: "inline-block", verticalAlign: "middle", width: "20px", height: "20px", boxSizing: "border-box", margin: "10px", color: "rgb(245, 170, 10)"}}><path fillRule="evenodd" d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 5zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path></svg><span style={{ display: "inline-block", verticalAlign: "middle" }}>An unknown error has occurred.</span></p>
				});
				break;
		}
		setPostState(0);
	}, [postState]);

    // TODO: (Badosz) display discord login button when not logged in
    // TODO: (Blue) style whole page
    return <div style={{width: "70vw", margin: "0 auto"}}>
            <div>
                {feedbackCategories && feedbackCategories.map(fCategory =>
                    // TODO: (Blue) fake checkbox - style
                    <div key={fCategory}>
						 <input name="category" type="radio" defaultChecked={fCategory === category} style={{appearance: "button"}} onClick={() => setCategory(fCategory) }/> 
                         {fCategory}
                    </div>    
                )}

            </div>
            <textarea 
                className="blue" 
                maxLength={256} 
                onChange={(e) => setTitle(e.target.value)}
                placeholder={"Title"}
            />
            <br/>
        	<textarea 
                className="blue" 
                maxLength={1024} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder={"Description"}
            />
            { (title.length >= 3 && title.length <= 100 && description.length >= 20 && description.length <= 2000) &&
                <div onClick={postFeedback}>Submit</div>
            }
            <ToastContainer />
    </div>
}

export default connect(store => store.login)(New);