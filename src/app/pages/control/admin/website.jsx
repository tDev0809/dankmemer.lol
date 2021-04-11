import React from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import 'assets/styles/pages/control/mods/inspect.scss';
import ControlCard from '../../../components/controlCard';

function AdminWebsite(props) {
	return (
		<div id="admin-website" style={{ marginTop: "6vh" }}>
            <h1 id="admin-website-title">Website management</h1>
            <ControlCard 
					mainIcon="store_front"
					colour="green"
					title="Start a<br>lootbox sale"
					options={{
						includeBody: true
					}}
					action={{ endpoint: "/admin/ban", method: "POST" }}
					inputOptions={{ icon: "local_offer", placeholder: "Sale percentage", min: 1, max: 100 }}
					dropdownOptions={{ 
						icon: "date_range",
						initial: "Sale duration",
						options: [
							{
								text: "1 Day",
								value: "24"
							},
							{
								text: "3 Days",
								value: "72"
							},
							{
								text: "1 Week",
								value: "168"
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
		</div>
	)
}

export default connect(store => store.login, null)(AdminWebsite);
