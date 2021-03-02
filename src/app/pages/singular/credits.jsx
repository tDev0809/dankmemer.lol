import React, { useEffect, useState } from 'react';
import '../../assets/styles/pages/singular/credits.scss';
// import users from './data/users.json';
import * as axios from 'axios';
import StaffCard from '../../components/staff';
import images from './util/images.js';
import createAd from '../../util/createAd';

// const categories = Object.entries(users);

export default function Staff() {
	const [users, setUsers] = useState([]);
	const [categories, setCategories] = useState([]);

	window.scroll(0,0)
	useEffect(() => {
		createAd('nitropay-staff-bottom', {
			sizes: [
				[728, 90],
				[970, 90],
				[970, 250]
			],
			renderVisibleOnly: true
		}, 'desktop');
		createAd('nitropay-staff-bottom', {
			sizes: [
				[320, 50],
				[300, 50],
				[300, 250]
			],
			renderVisibleOnly: true
		}, 'mobile');

		axios('/api/staff').then(({ data: staff }) => {
			setUsers(staff)
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
		})
	}, []);	

	useEffect(() => {
		setCategories(Object.entries(users));
	}, [users]);

	const getSocialIndex = ({ social }) => Object.keys(social).length === 0 ? -1 : 1;

	return (
		<div id="staff">
			<div id="staff-categories">
				{categories.map(([category, users], i) => (
					<div id={"staff-categories-" + category.toLowerCase().replace(/ /g, '-')} key={i}>
						<h1 className="staff-category-title">{category}</h1>
						<div className="staff-category-cards">
							{users.sort(() => Math.random() * 0.5).sort((a, b) => getSocialIndex(a) - getSocialIndex(b)).map((user, i) => (
								user.name !== '' ?
									<StaffCard
										{...user}
										key={i}
									/>
								: ''
							))}
						</div>
					</div>
				))}
			</div>
			<div id="nitropay-staff-bottom" className="nitropay" />
		</div>
	)
}
