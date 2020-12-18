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
			<p className="appeals-header-message">Please provide as much detail as possible when submitting your appeal.<br/>•</p>
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
					<label>Permanent bot ban</label>
				</div>
				<div className="appeals-body-group-radio">
					<label className="fake-checkbox">
						<span className={appealType === 'temporary' ? "appeals-body-group-radio-button active" : "appeals-body-group-radio-button"}/>
						<input name="temporary-appeal" type="radio" checked={appealType === 'temporary'} onClick={() => setAppealType('temporary') } />
					</label>
					<label>Temporary bot ban</label>
				</div>
				<div className="appeals-body-group-radio">
					<label className="fake-checkbox">
						<span className={appealType === 'server' ? "appeals-body-group-radio-button active" : "appeals-body-group-radio-button"}/>
						<input name="server-appeal" type="radio" checked={appealType === 'server'} onClick={() => setAppealType('server') } />
					</label>
					<label>Support server ban</label>
				</div>
			</div>
			<div className="appeals-body-group">
				<h3 className="appeals-body-group-title">Which rules did they break?</h3>
				{rules[appealType].map((rule, i) => (
					<div className="appeals-body-group-checkbox" key={i}>
						<input name={`rule-${i}`} type="checkbox" onInput={(e) => updateBrokenRules(i, e.target.checked)} />
						<div className="appeals-body-group-checkbox-num">{i + 1}</div>
						<label htmlFor={`rule-${i}`}>{rule}</label>
					</div>
				))}
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

// class Appeals extends Component {
//   textAreaRef = React.createRef();
//   state = {
//     banType: 'Bot Ban',
//     brokenRules: []
//   }

//   async send () {
//     if (!this.state.banType) {
//       return alert('You have to select the kind of ban you\'d like to appeal.');
//     }
//     if (this.textAreaRef.current.value.split(' ').length < 20) {
//       return alert('Your appeal must be at least 20 words.');
//     }
//     if (this.state.brokenRules.length === 0) {
//       return alert('You must tick at least one broken rule. If you feel like you haven\'t broken any, select "Not Applicable".');
//     }

//     const res = await fetch('/api/appeal', {
//       credentials: 'same-origin',
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         banType: this.state.banType,
//         body: this.textAreaRef.current.value,
//         rules: this.state.brokenRules
//       })
//     });

//     switch (res.status) {
//       case 429:
//         return this.setState({ finished: (
//           <>
//             <div className="header">
//               You've already recently appealed.
//             </div>
//             You have to wait before you try again.
//           </>
//         ) });

//       case 200:
//         return this.setState({ finished: (
//           <>
//             <div className="header">
//               Your appeal has been sent.
//             </div>
//             Make sure you keep your direct messages with the bot open.<br />
//             If we have any information to give you, the bot will send you a direct message.<br />
//             If your appeal is approved or denied, you may not receive a response either way.
//           </>
//         ) });

//       case 403:
//         return this.setState({ finished: (
//           <>
//             <div className="header">
//               You have been banned from sending appeals.
//             </div>
//             Appeal bans are un-appealable. Good job. I'm proud of you.
//           </>
//         ) });
//     }
//   }

//   handleRadio (e) {
//     this.setState({ banType: e.target.value });
//   }

//   handleCheckbox (rule) {
//     this.setState(prev => ({
//       brokenRules: prev.brokenRules.includes(rule)
//         ? prev.brokenRules.filter(brokenRule => brokenRule !== rule)
//         : prev.brokenRules.concat(rule)
//     }));
//   }

//   render () {
//     const titleCase = (text) => text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
//     if (false && !this.props.loggedIn) {
//       return (
//         <div className="content appeal">
//           <header className="header">
//             You can't appeal if you aren't logged in with your Discord account. <a href="/oauth/login?redirect=/appeals">Click this</a> to log in.
//           </header>
//         </div>
//       );
//     }

//     if (this.state.finished) {
//       return (
//         <div className="content appeal">
//           {this.state.finished}
//         </div>
//       );
//     }

//     return (
//       <div className="content appeal">
//         <div className='appeal-header-container'>
//           <h1>Appeal a ban</h1>
//           <h5>Please give as much detail as possible when writing your appeal.<br />Appealing does not guarantee an unban.</h5>
//         </div>
        
//         <section className='ban-type-section'>
//           <h2>What kind of ban would you like to appeal?</h2>
//           <div className='options'>
//             <div className='ban-type'>
//               <label className='appeal-check-container appeal-label'>
//                 <input
//                   type="radio"
//                   value="Bot Ban"
//                   checked={this.state.banType === 'Bot Ban'}
//                   onChange={this.handleRadio.bind(this)}
//                 />
//                 <span class="radio"></span>
//               </label>
//               <label className='appeal-label'>Bot Ban (Permanent Ban)</label>
//             </div>
            
//             <div className='ban-type'>
//               <label className='appeal-check-container appeal-label'>
//                 <input
//                   className="radio"
//                   type="radio"
//                   value="Bot Blacklist"
//                   checked={this.state.banType === 'Bot Blacklist'}
//                   onChange={this.handleRadio.bind(this)}
//                 />
//                 <span class="radio"></span>
//               </label>
//               <label className='appeal-label'>Bot Blacklist (Temporary Ban)</label>
//             </div>
            
//             <div className='ban-type'>
//               <label className='appeal-check-container appeal-label'>
//                 <input
//                   className="radio"
//                   type="radio"
//                   value="Server Ban"
//                   checked={this.state.banType === 'Server Ban'}
//                   onChange={this.handleRadio.bind(this)}
//                 />
//                 <span class="radio"></span>
//               </label>
//               <label className='appeal-label'>Support Server Ban</label>
//             </div>
//           </div>
//         </section>

//         <section>
//           <h2>Which rules did you break?</h2>
//           <div className='options'>
//             {rules[this.state.banType] ? rules[this.state.banType].map((rule, index) => (
//               <div className='appeal-rule-container'>
//                 <label className='appeal-check-container appeal-label' key={rule}>
//                   <input
//                     type="checkbox"
//                     value={rule}
//                     checked={this.state.brokenRules.includes(rule)}
//                     onChange={this.handleCheckbox.bind(this, rule)}
//                   />
//                   <span class="checkmark"></span>
//                 </label>
//                 <div className='appeal-number'>{`${index + 1}`}</div>
//                 <label className='appeal-label'>{`${titleCase(rule)}`}</label>
//               </div>
//             )) : ''}
//           </div>
//         </section>

//         <section>
//           <label className='appeal-textarea-label'>
//             Write the body of your appeal below. Why should we appeal your ban?

//             <textarea
//               className="textarea"
//               ref={this.textAreaRef}
//               rows="12"
//             />
//           </label>
//         </section>

//         <section>
//           <button
//             className='send-btn'
//             onClick={this.send.bind(this)}
//           >
//             Send
//           </button>
//         </section>
//       </div>
//     );
//   }
// }

export default connect(store => store.login)(Appeals);