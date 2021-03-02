import React from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'assets/styles/pages/control/mods/inspect.scss';
import ControlCard from '../../../components/controlCard';

function ModsInspect(props) {
	return (
		<div id="mods-inspect">
            <h1 id="mods-inspect-title">Inspect users</h1>
			<div id="mods-inspect-cards">
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
			</div>
		</div>
	)
}

export default connect(store => store.login, null)(ModsInspect);
