import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import ReactJson from 'react-json-view';

import 'react-toastify/dist/ReactToastify.css';
import 'assets/styles/pages/control/admin/users.scss';

import ControlCard from '../../../components/controlCard';

function AdminUsers(props) {

	const [showModal, setShowModal] = useState(true);
	const [modalContent, setModalContent] = useState({})

	useEffect(() => {
		console.log(modalContent);
		if(modalContent !== {}) setShowModal(true);
		else setShowModal(false);
	}, [modalContent])

	return (
		<div id="admin-users">
            <h1 id="admin-users-title">Control bot users</h1>
			<div id="admin-users-cards" className="card-grid">
				<ControlCard 
					mainIcon="remove"
					colour="red"
					title="Restrict a user's access"
					options={{
						includeBody: true
					}}
					action={{ endpoint: "/admin/ban", method: "POST" }}
					inputOptions={{ icon: "badge", placeholder: "Account ID" }}
					dropdownOptions={{ 
						icon: "desktop_access_disabled",
						initial: "Ban type",
						options: [
							{
								text: "Any reason",
								value: "Any"
							},
							{
								text: "Appeal ban",
								value: "Appeal"
							},
							{
								text: "Store ban",
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
					options={{
						includeBody: true
					}}
					action={{ endpoint: "/admin/unban", method: "POST" }}
					inputOptions={{ icon: "badge", placeholder: "Account ID" }}
					dropdownOptions={{ 
						icon: "desktop_windows",
						initial: "Ban reason",
						options: [
							{
								text: "Any reason",
								value: "Any"
							},
							{
								text: "Appeal ban",
								value: "Appeal"
							},
							{
								text: "Store ban",
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
				<ControlCard 
					mainIcon="person_search"
					colour="green"
					title="Review a user's access"
					action={{
						endpoint: "/admin/checkBan?type={{dropdown}}&id={{input}}",
						method: "GET"
					}}
					inputOptions={{ icon: "badge", placeholder: "Account ID" }}
					dropdownOptions={{ 
						icon: "desktop_windows",
						initial: "Ban reason",
						options: [
							{
								text: "Any reason",
								value: "Any"
							},
							{
								text: "Appeal ban",
								value: "Appeal"
							},
							{
								text: "Store ban",
								value: "Lootbox"
							}
						]
					}}
					finish={({ data }) => {
						toast.dark(<span>That user currently has <b>{data.length} ban{data.length === 1 ? '' : 's'}</b> related to <b>{data.length === 1 ? data[0].toLowerCase() === "appeal" ? "an " + data[0].toLowerCase() : 'a ' + data[0].toLowerCase() : 'both reasons'}</b></span>, {
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
					mainIcon="payments"
					colour="green"
					title="Find a store purchase"
					action={{ endpoint: "/admin/findTransaction?{{dropdown}}={{input}}", method: "GET" }}
					inputOptions={{ icon: "person", placeholder: "User details" }}
					dropdownOptions={{ 
						icon: "find_in_page",
						initial: "Find by",
						options: [
							{
								text: 'Account ID',
								value: 'Discord ID'
							},
							{
								text: 'Payment ID'
							},
							{
								text: 'PayPal E-Mail'
							},
							{
								text: 'Full name',
								value: 'Full Name'
							}
						]
					}}
					finish={(res) => {
						switch(res.status) {
							case 200:
								setModalContent(res.data);
								break;
							case 204:
								toast.error(<span>No purchase with that information was found.</span>, {
									position: "top-right",
									autoClose: 10000,
									hideProgressBar: true,
									pauseOnHover: true,
									draggable: true,
									progress: undefined,
									toastId: 'bannedUser'
								});
								break;
							default:
								toast.error(<span>Something went wrong while trying to find that purchase. Please try again.</span>, {
									position: "top-right",
									autoClose: 10000,
									hideProgressBar: true,
									pauseOnHover: true,
									draggable: true,
									progress: undefined,
									toastId: 'bannedUser'
								});
						}
					}}
				/>
			</div>
			{showModal ?
				<div id="admin-users-modal">
					<ReactJson src={modalContent} collapsed={true} theme="codeschool" />
				</div>
			: modalContent.length}
		</div>
	)
}

export default connect(store => store.login, null)(AdminUsers);
