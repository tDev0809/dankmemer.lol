import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DiscordLogin from '../../components/discordLogin';
import 'assets/styles/pages/control/control.scss';

import BanPanels from './panels/banPanels';
import GetPayment from './panels/GetPayment';
import AddStaff from './panels/AddStaff';
import RemoveStaff from './panels/RemoveStaff';

import * as axios from 'axios';
import StaffCard from '../../components/staff';
import EditStaff from '../../components/editStaff';
import createModal from '../../components/modal/index';

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
		axios(`/api/staff?id=${props.id}`).then(({ data: user }) => {
			user = user[0];
			setAdminUsername(user.name);
			setAdminBiography(user.about);
			setAdminImage(user.avatar);
			setAdminSocials(user.social)
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
					<GetPayment />
					<AddStaff />
					<RemoveStaff />
				</div>
			</div>
			: ''}
			{shouldRender ?
				<div id="staff-card">
					<StaffCard 
						name={adminUsername}
						about={adminBiography}
						social={adminSocials}
						avatar={adminImage}
					/>
					<span id="edit-staff-card" onClick={() => createModal(<EditStaff name={adminUsername} avatar={adminImage} social={adminSocials} about={adminBiography} />)}>Edit your staff card</span>
				</div>
			: ''}
			<ToastContainer />
		</div>
	)
}

export default connect(store => store.login, null)(Admin);
