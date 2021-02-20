import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as axios from 'axios';
import 'assets/styles/pages/control/admin/access.scss';

import AddStaff from '../panels/AddStaff';
import RemoveStaff from '../panels/RemoveStaff';
import CheckStaff from '../panels/CheckStaff';

function AdminAccess(props) {

	const [staff, setStaff] = useState(null);

	useEffect(() => {
		axios('/api/staff').then(({ data: staff }) => {
			setStaff(staff);
		}).catch(() => {
			// toast.dark("Our staff list was unable to be shown.", {
			// 	position: "top-right",
			// 	autoClose: 10000,
			// 	hideProgressBar: true,
			// 	pauseOnHover: true,
			// 	draggable: true,
			// 	progress: undefined,
			// 	toastId: 'noStaff'
			// });
		});
	}, [])

	useEffect(() => {
		console.log(staff);
	}, [staff])

	return (
		<div id="admin-access">
            <h1 id="admin-access-title">Manage Staff Members</h1>
			<div id="admin-access-cards">
				<AddStaff />
				<CheckStaff />
				<RemoveStaff />
			</div>
			{/* Icon, Username, Account ID, Roles, Actions << (Remove, Edit, Staff Card) */}
			<div id="admin-access-staff-list">
				<h2 id="admin-access-staff-list-title">All current staff members</h2>
				<table>
					<thead>
						<tr>
							<th></th>
							<th>Staff member</th>
							<th>Role</th>
							<th>About</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
					{staff && Object.entries(staff).map(([category, users]) => (
						users.map((user, i) => (
							<tr className="staff-row"  key={i}>
								<td className="staff-row-group">
									<img className="staff-row-group-picture" src={user.avatar} alt="?"/>
								</td>
								<td className="staff-row-group-username">{user.name} (<span>{user._id}</span>)</td>
								<td>{category}</td>
								<th>{user.about.substr(0, 100)}</th>
								<td className="staff-row-actions">
									<p className="staff-row-actions-inspect">Inspect</p>
									<p className="staff-row-actions-remove">Remove</p>
								</td>
							</tr>
						))
					))}		
					</tbody>		
				</table>
			</div>
		</div>
	)
}

export default connect(store => store.login, null)(AdminAccess);
