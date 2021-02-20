import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'assets/styles/pages/control/admin/access.scss';

import AddStaff from '../panels/AddStaff';
import RemoveStaff from '../panels/RemoveStaff';
import CheckStaff from '../panels/CheckStaff';

function AdminAccess(props) {
	return (
		<div id="admin-access">
            <h1 id="admin-access-title">Manage Staff Members</h1>
			<div id="admin-access-cards">
				<AddStaff />
				<CheckStaff />
				<RemoveStaff />
			</div>
		</div>
	)
}

export default connect(store => store.login, null)(AdminAccess);
