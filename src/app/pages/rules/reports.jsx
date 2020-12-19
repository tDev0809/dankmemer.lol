import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import rules from './data/rules.js';

import 'assets/styles/pages/rules/reports.scss';

function Reports(props) {
	const [reportType, setReportType] = useState('user');
	const [reporting, setReporting] = useState('');
	const [brokenRules, setBrokenRules] = useState([]);
	const [reportContent, setReportContent] = useState('');
	const [reportState, setReportState] = useState(0);
	
	useEffect(() => {
		window.scroll(0,0)
	}, []);

	useEffect(() => {
		if(reportState === 0) return;
		switch(reportState) {
			case 200:
				toast.update('reportState', {
					render: <p><svg viewBox="0 0 16 16" fill="currentColor" style={{display: "inline-block", verticalAlign: "middle", width: "20px", height: "20px", boxSizing: "border-box", margin: "10px", color: "rgb(50, 211, 139)"}}><path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path></svg><span style={{ display: "inline-block", verticalAlign: "middle" }}>Your report has been submitted.</span></p>
				});
				break;
			case 403:
				toast.update('reportState', {
					render: <p><svg viewBox="0 0 16 16" fill="currentColor" style={{display: "inline-block", verticalAlign: "middle", width: "20px", height: "20px", boxSizing: "border-box", margin: "10px", color: "rgb(233, 76, 88)"}}><path fillRule="evenodd" d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path></svg><span style={{ display: "inline-block", verticalAlign: "middle" }}>You have been banned from reporting users.</span></p>
				});
				break;
			case 429:
				toast.update('reportState', {
					render: <p><svg viewBox="0 0 16 16" fill="currentColor" style={{display: "inline-block", verticalAlign: "middle", width: "20px", height: "20px", boxSizing: "border-box", margin: "10px", color: "rgb(245, 170, 10)"}}><path fillRule="evenodd" d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 5zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path></svg><span>Woah there! Way too spicy</span></p>
				});
				break;
			default:
				toast.update('reportState', {
					render: <p><svg viewBox="0 0 16 16" fill="currentColor" style={{display: "inline-block", verticalAlign: "middle", width: "20px", height: "20px", boxSizing: "border-box", margin: "10px", color: "rgb(245, 170, 10)"}}><path fillRule="evenodd" d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 5zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path></svg><span style={{ display: "inline-block", verticalAlign: "middle" }}>An unknown error has occurred.</span></p>
				});
				break;
		}
		setReportState(0);
	}, [reportState]);

	const sendReport = async() => {
		if(!props.loggedIn) {
			return toast.dark(<p><svg viewBox="0 0 16 16" fill="currentColor" style={{display: "inline-block", verticalAlign: "middle", width: "20px", height: "20px", boxSizing: "border-box", margin: "10px", color: "rgb(233, 76, 88)"}}><path fillRule="evenodd" d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path></svg><span style={{ display: "inline-block", verticalAlign: "middle" }}>You need to be logged in!</span></p>, {
				position: "top-right",
				autoClose: 10000,
				hideProgressBar: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				toastId: 'reportState'
			});
		}
		if(brokenRules.length < 1) return;
		if(reportContent.length < 20) return;

		let _brokenRules = [];
		rules[reportType].forEach((rule, i) => {
			if(brokenRules.sort((a, b) => a - b).includes(i))  _brokenRules.push(rule);
		});

		toast.dark(<p><svg viewBox="5 5 40 40" fill="currentColor" style={{display: "inline-block", verticalAlign: "middle", width: "20px", height: "20px", boxSizing: "border-box", margin: "10px", color: "rgb(65, 146, 255)"}}><path d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"><animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.5s" repeatCount="indefinite"></animateTransform></path></svg><span style={{ display: "inline-block", verticalAlign: "middle" }}>Submitting your report.</span></p>, {
			position: "top-right",
			autoClose: 10000,
			hideProgressBar: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			toastId: 'reportState'
		});

		const res = await fetch('/api/report', {
      		credentials: 'same-origin',
      		method: 'POST',
      		headers: {
        		'Content-Type': 'application/json'
      		},
      		body: JSON.stringify({
        		reportType,
				reporting,
        		content: reportContent,
        		rules: _brokenRules
      		})
    	});

		setReportState(res.status)
	}

	const updateBrokenRules = (index, state) => {
		if(brokenRules.includes(index) && !state) setBrokenRules(brokenRules.filter(i => i != index));
		else if(!brokenRules.includes(index) && state) setBrokenRules(oldBrokenRulesState => [...oldBrokenRulesState, index]);
	}

	return (
		<div id="reports">
			<div id="reports-header">
				<h1 id="reports-header-title">Report a {reportType}</h1>
				<p className="reports-header-message">Please provide as much detail as possible when submitting your report.<br/>•</p>
				<p className="reports-header-message">We are unable to provide details on the punishment from this report.</p>
			</div>
			<div id="reports-body">
				<div className="reports-body-group">
					<h3 className="reports-body-group-title">What type of report is this?</h3>
					<div className="reports-body-group-radio">
						<label className="fake-checkbox">
							<span className={reportType === 'user' ? "reports-body-group-radio-button active" : "reports-body-group-radio-button"}/>
							<input name="user-report" type="radio" checked={reportType === 'user'} onClick={() => setReportType('user') } />
						</label>
						<label>User report</label>
					</div>
					<div className="reports-body-group-radio">
						<label className="fake-checkbox">
							<span className={reportType === 'server' ? "reports-body-group-radio-button active" : "reports-body-group-radio-button"}/>
							<input name="server-report" type="radio" checked={reportType === 'server'} onClick={() => setReportType('server') } />
						</label>
						<label>Server report</label>
					</div>
					<div className="reports-body-group-text">
						<input name="reporting" type="text" onChange={(e) => setReporting(e.target.value)}/>
						<label htmlFor="reporting">ID of {reportType} you are reporting.</label>
					</div>
				</div>
				<div className="reports-body-group">
					<h3 className="reports-body-group-title">Which rules did they break?</h3>
					{rules[reportType].map((rule, i) => (
						<div className="reports-body-group-checkbox" key={i}>
							<input name={`rule-${i}`} type="checkbox" onInput={(e) => updateBrokenRules(i, e.target.checked)} />
							<div className="reports-body-group-checkbox-num">{i + 1}</div>
							<label htmlFor={`rule-${i}`}>{rule}</label>
						</div>
					))}
				</div>
				<div className="reports-body-group">
					<h3 className="reports-body-group-title">Please write your report below.</h3>
					<textarea className="reports-body-group-textarea" maxLength={1024} onChange={((e) => setReportContent(e.target.value))} />
				</div>
				{(reporting.length > 16 && reporting.length < 22) && brokenRules.length >= 1 && reportContent.length >= 20 ? 
				<div id="reports-body-actions">
					<span id="reports-body-actions-submit" onClick={sendReport}>Report {reportType}</span>
				</div> : ''}
			</div>
			<ToastContainer />
		</div>
	)
}

export default connect(store => store.login)(Reports);