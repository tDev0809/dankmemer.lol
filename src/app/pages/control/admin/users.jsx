import React from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'assets/styles/pages/control/admin/users.scss';
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
								text: 'Account ID'
							},
							{
								text: 'Payment ID'
							},
							{
								text: 'PayPal E-Mail'
							},
							{
								text: 'Full name'
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

export default connect(store => store.login, null)(AdminUsers);
