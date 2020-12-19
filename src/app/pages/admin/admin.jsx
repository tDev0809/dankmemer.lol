import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import DiscordLogin from '../../components/discordLogin';
import 'assets/styles/pages/admin/admin.scss';


import BanPanels from './panels/banPanels';
import GetPayment from './panels/GetPayment';

function Admin (props) {

	useEffect(() => {
		if(props.loggedIn && !props.isAdmin) return window.location.replace('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
	}, [props])

	return (
		<div id="admin">
			{!props.loggedIn ? 
				<div id="admin-login">
					<div id="admin-login-content">
						<h1 id="admin-login-content-title">Restricted</h1>
						<p id="admin-login-content-body">The page you are trying to access is restricted. Please login to continue</p>
						<DiscordLogin />
					</div>
				</div>
			:
			<div id="admin-content">
				<h1 id="admin-content-title">Admin Control Panel</h1>
				<div id="nitropay-admin-top" className={window.nitroAds ? "nitropay ad-h" : 'nitropay ad-h blocked'}/>
				<div id="admin-content-panels">
					{BanPanels.map((Panel, key) => (<Panel key={key} />))}
					{<GetPayment/>}
				</div>
			</div>
			}
		</div>
	)
}

export default connect(store => store.login, null)(Admin);
