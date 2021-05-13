import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import * as axios from 'axios';
import 'assets/styles/pages/control/admin/access.scss';
import ControlCard from '../../../components/controlCard';
import EditStaff from '../../../components/editStaff';
import createModal from '../../../components/modal';

function AdminAccess(props) {

	const [staff, setStaff] = useState(null);
	// const [inspID, setInspID] = useState(0);
	// const [inspAvatar, setInspAvatar] = useState("");
	// const [inspUsername, setInspUsername] = useState("");
	// const [inspSocials, setInspSocials] = useState({})
	// const [inspAbout, setInspAbout] = useState("");
	// const [inspecting, setInspecting] = useState(false);

	useEffect(() => {
		axios('/api/staff').then(({ data: staff }) => {
			setStaff(staff);
		}).catch(() => {
			toast.dark("Our staff list was unable to be shown.", {
				position: "top-right",
				autoClose: 10000,
				hideProgressBar: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				toastId: 'noStaff'
			});
		});
	}, []);

	// const removeStaff = (id, username) => {
	// 	if(!confirm(`You are about to permanently remove all of ${username}'s card data. This action cannot be undone.\n\nDo you wish to continue?`))
	// 	axios({
	// 		url: `/api/admin/staff?id=${id}`,
	// 		method: 'DELETE'
	// 	}).then(() => {
	// 		axios('/api/staff').then(({ data: staff }) => {
	// 			setStaff(staff);
	// 		}).catch(() => {
	// 			toast.dark("Our staff list was unable to be shown.", {
	// 				position: "top-right",
	// 				autoClose: 10000,
	// 				hideProgressBar: true,
	// 				pauseOnHover: true,
	// 				draggable: true,
	// 				progress: undefined,
	// 				toastId: 'noStaff'
	// 			});
	// 		});
	// 	}).catch((e) => {
	// 		toast.error("There was an issue when trying to remove that staff member. If this problem persists check the console for errors.", {
	// 			position: 'top-right',
	// 			autoClose: 3000,
	// 			pauseOnHover: true,
	// 			draggable: true,
	// 			toastId: 'noRemove'
	// 		})
	// 	})
	// }

	// const inspect = (id) =>  {
	// 	axios({
	// 		url: `/api/staff?id=${id}`,
	// 		method: 'GET'
	// 	}).then(({ data: user }) => {
	// 		user = user[0]
	// 		setInspID(id);
	// 		setInspUsername(user.name);
	// 		setInspAbout(user.about);
	// 		setInspAvatar(user.avatar);
	// 		setInspSocials(user.social);
	// 		setInspecting(true);
	// 	}).catch(e => {
	// 		console.error(e);
	// 		toast.dark("could not inspect.", {
	// 			position: "top-right",
	// 			autoClose: 10000,
	// 			hideProgressBar: true,
	// 			pauseOnHover: true,
	// 			draggable: true,
	// 			progress: undefined,
	// 			toastId: 'noStaff'
	// 		});
	// 	})
	// }

	return (
		<div id="admin-access">
            <h1 id="admin-access-title">Manage Staff Members</h1>
			<div id="admin-access-cards">
				<ControlCard 
					mainIcon="person_add"
					colour="green"
					title="Add a new<br/>staff member"
					resize={true}
					action={{ endpoint: "/admin/staff?id={{input}}&category={{dropdown}}", method: "POST" }}
					inputOptions={{ icon: "badge", placeholder: "Account ID" }}
					dropdownOptions={{ 
						icon: "badge",
						initial: "Staff type",
						options: [
							{
								text: "Moderator",
								value: "Moderators"
							},
							{
								text: "Honorable Mention",
								value: "Honorable Mentions"
							},
							{
								text: "Server Management",
								value: "Server Management"
							},
							{
								text: "Developer",
								value: "Developers"
							}
						]
					}}
					finish={() => {
						toast.dark("New staff member added.", {
							position: "top-right",
							autoClose: 10000,
							hideProgressBar: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
							toastId: 'newStaff'
						});
					}}
				/>
				<ControlCard 
					mainIcon="person_search"
					colour="green"
					title="Search for<br/>staff members"
					resize={true}
					action={{ endpoint: "/admin/staff?id={{input}}", method: "GET" }}
					inputOptions={{ icon: "badge", placeholder: "Account ID" }}
					finish={() => {
						toast.dark("That staff member was found in the database.", {
							position: "top-right",
							autoClose: 10000,
							hideProgressBar: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
							toastId: 'staffFound'
						});
					}}
				/>
				<ControlCard 
					mainIcon="person_remove"
					colour="red"
					title="Remove a<br/>staff member"
					resize={true}
					action={{ endpoint: "/admin/staff?id={{input}}", method: "DELETE" }}
					inputOptions={{ icon: "badge", placeholder: "Account ID" }}
					finish={() => {
						toast.dark("Staff member removed.", {
							position: "top-right",
							autoClose: 10000,
							hideProgressBar: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
							toastId: 'newStaff'
						});
					}}
				/>
			</div>
			<div id="admin-access-staff-list">
				<h2 id="admin-access-staff-list-title">All current staff members</h2>
					{staff && Object.entries(staff).map(([category, users]) => (
						users.map((user, i) => (
							<div className="staff-row" key={i}>
								<div className="staff-row-group">
									<img className="staff-row-group-picture" src={user.avatar} alt="?"/>
									<p className="staff-row-group-username">{user.name} <span className="staff-row-group-id"><span style={{ userSelect: "none" }}>(</span>{user._id}<span style={{ userSelect: "none" }}>)</span></span></p>
								</div>
								<p className="staff-row-role">{category}</p>
								<p className="staff-row-about">{user.about.substr(0, 100)}{user.about.length > 100 ? '...' : ''}</p>
								{/* 
								
								Right now, these actions will not be used. The inspect functionality is proving
								too difficult to add, maybe it is because I have been working for 14 hours but
								maybe I am just stupid. WIP.

								<div className="staff-row-actions">
									<p className="staff-row-actions-inspect" onClick={() => inspect(user._id)}>Inspect</p>
									<p className="staff-row-actions-remove" onClick={() => removeStaff(user._id, user.name)}>Remove</p>
								</div> 
								
								*/}
							</div>
						))
					))}		
			</div>
		</div>
	)
}

export default connect(store => store.login, null)(AdminAccess);
