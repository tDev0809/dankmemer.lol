import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DiscordLogin from '../../components/discordLogin';
import 'assets/styles/pages/control/control.scss';

import BanPanels from './panels/banPanels';
import GetPayment from './panels/GetPayment';

import StaffCard from '../../components/staff';
import users from '../singular/data/users.json';
import images from '../singular/util/images.js';
import flatten from '../../util/flattenObject.js';

function Admin (props) {
	const [shouldRender, setShouldRender] = useState(false)

	const [adminUsername, setAdminUsername] = useState('');
	const [adminBiography, setAdminBiography] = useState('');
	const [adminImage, setAdminImage] = useState('');
	const [adminSocials, setAdminSocials] = useState('');

	useEffect(() => {
		if(props.loggedIn && props.isModerator) setShouldRender(true);
		if(props.loggedIn && !props.isModerator) return window.location.replace('https://www.youtube.com/watch?v=dQw4w9WgXcQ');

		if(!props.loggedIn) return;
		let user = flatten(users).filter(u => u.name === props.username)[0];
		setAdminUsername(user.name);
		setAdminBiography(user.about);
		setAdminImage(images[user.name.toLowerCase().replace(/ /g, '-')]);
		setAdminSocials(user.social)
	}, [props]);

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
			<div id="control-admin">
				<div id="control-admin-header">
					<h1 id="control-admin-header-title">Hey, {adminUsername}</h1>
					<p id="control-admin-header-note">This is your control panel. The main place for you to manage users and check payments. You are also able to edit the appearance of your staff card.</p>
				</div>
				<div id="control-admin-panels">
					{BanPanels.map((Panel, key) => (<Panel key={key} />))}
					{<GetPayment/>}
				</div>
			</div>
			: ''}
			{shouldRender ? 
				<StaffCard 
					name={adminUsername}
					about={adminBiography}
					social={adminSocials}
					picture={adminImage}
				/>
			: ''}
			<ToastContainer />
		</div>
	)
}

export default connect(store => store.login, null)(Admin);
