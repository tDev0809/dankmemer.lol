import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import rules from './data/appeals.js';

import 'assets/styles/pages/rules/appeals.scss';

function Appeals(props) {
	const [appealType, setAppealType] = useState('permanent');
	const [appealing, setAppealing] = useState('');
	const [brokenRules, setBrokenRules] = useState([]);
	const [appealContent, setAppealContent] = useState('');
	const [appealState, setAppealState] = useState(0);

	useEffect(() => {
		window.scroll(0,0)
	}, [])

	useEffect(() => {
		if(appealState === 0) return;
		switch(appealState) {
			case 200:
				toast.update('appealState', {
					render: <p><svg viewBox="0 0 16 16" fill="currentColor" style={{display: "inline-block", verticalAlign: "middle", width: "20px", height: "20px", boxSizing: "border-box", margin: "10px", color: "rgb(50, 211, 139)"}}><path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path></svg><span style={{ display: "inline-block", verticalAlign: "middle" }}>Your appeal has been submitted.</span></p>
				});
				break;
			case 403:
				toast.update('appealState', {
					render: <p><svg viewBox="0 0 16 16" fill="currentColor" style={{display: "inline-block", verticalAlign: "middle", width: "20px", height: "20px", boxSizing: "border-box", margin: "10px", color: "rgb(233, 76, 88)"}}><path fillRule="evenodd" d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path></svg><span style={{ display: "inline-block", verticalAlign: "middle" }}>You have been banned from appealing other bans.</span></p>
				});
				break;
			case 429:
				toast.update('appealState', {
					render: <p><svg viewBox="0 0 16 16" fill="currentColor" style={{display: "inline-block", verticalAlign: "middle", width: "20px", height: "20px", boxSizing: "border-box", margin: "10px", color: "rgb(245, 170, 10)"}}><path fillRule="evenodd" d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 5zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path></svg><span>Woah there! Way too spicy</span></p>
				});
				break;
			default:
				toast.update('appealState', {
					render: <p><svg viewBox="0 0 16 16" fill="currentColor" style={{display: "inline-block", verticalAlign: "middle", width: "20px", height: "20px", boxSizing: "border-box", margin: "10px", color: "rgb(245, 170, 10)"}}><path fillRule="evenodd" d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 5zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path></svg><span style={{ display: "inline-block", verticalAlign: "middle" }}>An unknown error has occurred.</span></p>
				});
				break;
		}
		setAppealState(0);
	}, [appealState]);

	const sendAppeal = async () => {
		if(!props.loggedIn) {
			return toast.dark(<p><svg viewBox="0 0 16 16" fill="currentColor" style={{display: "inline-block", verticalAlign: "middle", width: "20px", height: "20px", boxSizing: "border-box", margin: "10px", color: "rgb(233, 76, 88)"}}><path fillRule="evenodd" d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path></svg><span style={{ display: "inline-block", verticalAlign: "middle" }}>You need to be logged in!</span></p>, {
				position: "top-right",
				autoClose: 10000,
				hideProgressBar: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				toastId: 'appealState'
			});
		}
		if(brokenRules.length < 1) return;
		if(appealContent.length < 20) return;

		let _brokenRules = [];
		rules[appealType].forEach((rule, i) => {
			if(brokenRules.sort((a, b) => a - b).includes(i))  _brokenRules.push(rule);
		});

		toast.dark(<p><svg viewBox="5 5 40 40" fill="currentColor" style={{display: "inline-block", verticalAlign: "middle", width: "20px", height: "20px", boxSizing: "border-box", margin: "10px", color: "rgb(65, 146, 255)"}}><path d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"><animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.5s" repeatCount="indefinite"></animateTransform></path></svg><span style={{ display: "inline-block", verticalAlign: "middle" }}>Submitting your appeal.</span></p>, {
			position: "top-right",
			autoClose: 10000,
			hideProgressBar: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			toastId: 'appealState'
		});

		const res = await fetch('/api/appeal', {
      		credentials: 'same-origin',
      		method: 'POST',
      		headers: {
        		'Content-Type': 'application/json'
      		},
      		body: JSON.stringify({
        		banType: appealType,
        		content: appealContent,
        		rules: _brokenRules
      		})
    	});

		setAppealState(res.status);
	}

	const updateBrokenRules = (index, state) => {
		if(brokenRules.includes(index) && !state) setBrokenRules(brokenRules.filter(i => i != index));
		else if(!brokenRules.includes(index) && state) setBrokenRules(oldBrokenRulesState => [...oldBrokenRulesState, index]);
	}

	return (
		<div id="appeals">
			<div id="appeals-header">
				<h1 id="appeals-header-title">Appeal a {appealType} ban</h1>
				<p className="appeals-header-message">Please provide as much detail as possible when submitting your appeal.<br/></p>
				<p className="appeals-header-message">Appealing does not guarantee a reprieval of the punishment.</p>
			</div>
			<div id="appeals-body">
				<div className="appeals-body-group">
					<h3 className="appeals-body-group-title">What kind of ban are you appealing?</h3>
					<div className="appeals-body-group-radio">
						<label className="fake-checkbox">
							<span className={appealType === 'permanent' ? "appeals-body-group-radio-button active" : "appeals-body-group-radio-button"}/>
							<input name="permanent-appeal" type="radio" checked={appealType === 'permanent'} onClick={() => setAppealType('permanent') } />
						</label>
						<label>Bot Ban</label>
					</div>
					<div className="appeals-body-group-radio">
						<label className="fake-checkbox">
							<span className={appealType === 'temporary' ? "appeals-body-group-radio-button active" : "appeals-body-group-radio-button"}/>
							<input name="temporary-appeal" type="radio" checked={appealType === 'temporary'} onClick={() => setAppealType('temporary') } />
						</label>
						<label>Bot Blacklist</label>
					</div>
					<div className="appeals-body-group-radio">
						<label className="fake-checkbox">
							<span className={appealType === 'community' ? "appeals-body-group-radio-button active" : "appeals-body-group-radio-button"}/>
							<input name="community-appeal" type="radio" checked={appealType === 'community'} onClick={() => setAppealType('community') } />
						</label>
						<label>Community Server Ban</label>
					</div>
					<div className="appeals-body-group-radio">
						<label className="fake-checkbox">
							<span className={appealType === 'support' ? "appeals-body-group-radio-button active" : "appeals-body-group-radio-button"}/>
							<input name="support-appeal" type="radio" checked={appealType === 'support'} onClick={() => setAppealType('support') } />
						</label>
						<label>Support Server Ban</label>
					</div>
				</div>
				<div className="appeals-body-group">
					<h3 className="appeals-body-group-title">Which rules did you break?</h3>
					<table>
						<tbody>
							{rules[appealType].map((rule, i) => (
								<tr className="appeals-body-group-checkbox" key={i}>
									<td>
										<input name={`rule-${i}`} type="checkbox" onInput={(e) => updateBrokenRules(i, e.target.checked)} />
										<p className="appeals-body-group-checkbox-num">{i + 1}</p>
									</td>
									<td>
										<label htmlFor={`rule-${i}`}>{rule}</label>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className="appeals-body-group">
					<h3 className="appeals-body-group-title">Please write your appeal below.</h3>
					<textarea className="appeals-body-group-textarea" maxLength={1024} onChange={((e) => setAppealContent(e.target.value))} />
				</div>
				{brokenRules.length >= 1 && appealContent.length >= 20 ? 
				<div id="appeals-body-actions">
					<span id="appeals-body-actions-submit" onClick={sendAppeal}>Appeal ban</span>
				</div> : ''}
			</div>
			<ToastContainer />
		</div>
	)
}

export default connect(store => store.login)(Appeals);