import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import DiscordLogin from '../../components/discordLogin';
import 'assets/styles/pages/admin/admin.scss';


import BanPanels from './panels/banPanels';
import GetPayment from './panels/GetPayment';

const adPlacements = [
	'nitropay-admin-top'
]

function Admin (props) {
	const history = useHistory();

	useEffect(() => {
		// adPlacements.forEach((placement) => {
		// 	window.nitroAds && window.nitroAds.createAd(placement, {
		// 		"refreshLimit": 10,
		// 		"refreshTime": 90,
		// 		"renderVisibleOnly": false,
		// 		"refreshVisibleOnly": true,
		// 		"sizes": [
		// 		  [
		// 			"728",
		// 			"90"
		// 		  ],
		// 		  [
		// 			"320",
		// 			"50"
		// 		  ]
		// 		],
		// 		"report": {
		// 		  "enabled": true,
		// 		  "wording": "Report Ad",
		// 		  "position": "top-right"
		// 		}
		// 	});
		// });
	}, []);

	useEffect(() => {
		if(props.loggedIn && !props.isAdmin) return window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
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
				<div id="nitropay-admin-top" className="nitropay ad-h"/>
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
