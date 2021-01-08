import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DiscordLogin from '../../components/discordLogin';
import 'assets/styles/pages/control/control.scss';

import StaffCard from '../../components/staff';
// import users from '../singular/data/users.json';
import images from '../singular/util/images.js';

function Mods(props) {
	const [shouldRender, setShouldRender] = useState(false);
	const [checkingUser, setCheckingUser] = useState(0);

	const [modUsername, setModUsername] = useState('');
	const [modBiography, setModBiography] = useState('');
	const [modImage, setModImage] = useState('');
	const [modSocials, setModSocials] = useState('');

	useEffect(() => {
		if(props.loggedIn && props.isModerator) setShouldRender(true);
		if(props.loggedIn && !props.isModerator) return window.location.replace('https://www.youtube.com/watch?v=dQw4w9WgXcQ');

		if(!props.loggedIn) return;
		axios(`/api/staff?id=${props.id}`).then(({ data: user }) => {
			user = user[0];
			setModUsername(user.name);
			setModBiography(user.about);
			setModImage(user.avatar);
			setModSocials(user.social)
		}).catch(() => 			
			toast.dark("Your staff card data was not able to be shown.", {
			position: "top-right",
			autoClose: 10000,
			hideProgressBar: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			toastId: 'noStaff'
		}));
	}, [props]);

	const checkUserBans = async () => {
		try {
			let { data: bans } = await axios(`/api/mods/checkBan?type=any&id=${checkingUser}`);
			if(bans[0]) {
				toast.dark(<p><svg viewBox="0 0 16 16" fill="currentColor" style={{display: "inline-block", verticalAlign: "middle", width: "20px", height: "20px", boxSizing: "border-box", margin: "10px", color: "rgb(233, 76, 88)"}}><path fillRule="evenodd" d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path></svg><span style={{ display: "inline-block", verticalAlign: "middle" }}>The user has {bans.length === 1 && bans[0] === 'appeal'  ? 'an ' : 'a '}{bans.join(" & ")} ban{bans.length === 1  ? '' : 's'}.</span></p>, {
					position: "top-right",
					autoClose: 10000,
					hideProgressBar: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					toastId: 'appealState'
				});
			} else {
				toast.dark(<p><svg viewBox="0 0 16 16" fill="currentColor" style={{display: "inline-block", verticalAlign: "middle", width: "20px", height: "20px", boxSizing: "border-box", margin: "10px", color: "rgb(50, 211, 139)"}}><path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path></svg><span style={{ display: "inline-block", verticalAlign: "middle" }}>This user has no website bans.</span></p>, {
					position: "top-right",
					autoClose: 10000,
					hideProgressBar: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					toastId: 'appealState'
				});
			}
		} catch (e) {
			console.error(e);
		}
	}

	return (
		<div id="control">
			{!shouldRender || !props.loggedIn ? 
				<div id="control-login">
					<div id="control-login-content">
						<h1 id="control-login-content-title">Restricted</h1>
						<p id="control-login-content-body">The page you are trying to access is restricted. Please login to continue</p>
						<DiscordLogin />
					</div>
				</div>
			: shouldRender ?
			<div id="control-mods">
				<div id="control-mods-header">
					<h1 id="control-mods-header-title">Hey, {modUsername}</h1>
					<p id="control-mods-header-note">This is your control panel. Here you can change the appearance of your staff card and get website related information regarding a user.</p>
				</div>
				<div id="control-mods-checker">
					<h3 id="control-mods-checker-title">Check website bans</h3>
					<p id="control-mods-checker-note">Quickly check to see if a user is website banned which may be restricting their access to specific parts of the website.</p>
					<div id="control-mods-checker-input">
						<label htmlFor="checking">User ID</label>
						<input name="checking" type="text" onChange={(e) => setCheckingUser(e.target.value)}/>
					</div>
					<div id="control-mods-checker-actions">
						<span id="control-mods-checker-actions-submit" onClick={checkUserBans}>Check user</span>
					</div>
				</div>
			</div>
			: ''}
			{shouldRender ? 
				<StaffCard 
					name={modUsername}
					about={modBiography}
					social={modSocials}
					avatar={modImage}
				/>
			: ''}
			<ToastContainer />
		</div>
	)
}

export default connect(store => store.login, null)(Mods);
