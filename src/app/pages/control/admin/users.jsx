import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as axios from 'axios';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'assets/styles/pages/control/admin/users.scss';

import BanPanels from '../panels/banPanels';
import GetPayment from '../panels/GetPayment';
import ControlCard from '../../../components/controlCard';

function AdminUsers(props) {

	return (
		<div id="admin-users">
            <h1 id="admin-users-title">Control bot users</h1>
			<div id="admin-users-cards">
				<ControlCard 
					mainIcon="remove"
					colour="red"
					title="Restrict a user's access"
					action={{ endpoint: "/admin/ban", method: "POST" }}
					inputOptions={{ icon: "badge", placeholder: "Account ID" }}
					dropdownOptions={{ 
						icon: "desktop_access_disabled",
						initial: "Ban type",
						options: [
							{
								text: "All",
								value: "Any"
							},
							{
								text: "Appeal",
								value: "Appeal"
							},
							{
								text: "Store",
								value: "Lootbox"
							}
						]
					}}
					finish={() => {
						toast.dark("The requested user has been banned!", {
							position: "top-right",
							autoClose: 10000,
							hideProgressBar: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
							toastId: 'bannedUser'
						});
					}}
				/>
				<ControlCard 
					mainIcon="done"
					colour="green"
					title="Reinstate a user's access"
					action={{ endpoint: "/admin/unban", method: "POST" }}
					inputOptions={{ icon: "badge", placeholder: "Account ID" }}
					dropdownOptions={{ 
						icon: "desktop_windows",
						initial: "Ban reason",
						options: [
							{
								text: "All",
								value: "Any"
							},
							{
								text: "Appeal",
								value: "Appeal"
							},
							{
								text: "Store",
								value: "Lootbox"
							}
						]
					}}
					finish={() => {
						toast.dark("That user's access has been reinstated.", {
							position: "top-right",
							autoClose: 10000,
							hideProgressBar: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
							toastId: 'bannedUser'
						});
					}}
				/>
                {BanPanels.map((Panel, key) => (<Panel key={key} />))}
				<GetPayment />
			</div>
		</div>
	)
}

export default connect(store => store.login, null)(AdminUsers);
