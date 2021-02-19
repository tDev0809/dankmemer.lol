import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
// import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'assets/styles/pages/control/control.scss';

import AddStaff from '../panels/AddStaff';
import RemoveStaff from '../panels/RemoveStaff';
import CheckStaff from '../panels/CheckStaff';

function AdminAccess(props) {
	return (
		<div id="admin-access">
            <h1>Manage Staff Members</h1>
		</div>
	)
}

export default connect(store => store.login, null)(AdminAccess);
