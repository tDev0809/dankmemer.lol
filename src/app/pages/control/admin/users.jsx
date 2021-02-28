import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as axios from 'axios';
import 'assets/styles/pages/control/admin/users.scss';

import BanPanels from '../panels/banPanels';
import GetPayment from '../panels/GetPayment';

function AdminUsers(props) {

	return (
		<div id="admin-users">
            <h1 id="admin-users-title">Control bot users</h1>
			<div id="admin-users-cards">
                {BanPanels.map((Panel, key) => (<Panel key={key} />))}
				<GetPayment />
			</div>
		</div>
	)
}

export default connect(store => store.login, null)(AdminUsers);
