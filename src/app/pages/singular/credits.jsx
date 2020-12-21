import React, { useEffect } from 'react';
import '../../assets/styles/pages/singular/credits.scss';
import users from './data/users.json';
import StaffCard from '../../components/staff';
import images from './util/images.js';
import createAd from '../../util/createAd';

const categories = Object.entries(users);
const getSocialIndex = ({ social }) => Object.keys(social).length === 0 ? -1 : 1;

export default function Staff() {
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
	}, []);

	return (
		<div id="staff">
			<div id="staff-categories">
				{categories.map(([category, users], i) => (
					<div id={"staff-categories-" + category.toLowerCase().replace(/ /g, '-')} key={i}>
						<h1 className="staff-category-title">{category}</h1>
						<div className="staff-category-cards">
							{users.sort(() => Math.random() * 0.5).sort((a, b) => getSocialIndex(a) - getSocialIndex(b)).map((user, i) => (
								<StaffCard
									{...user}
									key={i}
									picture={images[user.name.toLowerCase().replace(/ /g, '-')]}
								/>
							))}
						</div>
					</div>
				))}
			</div>
			<div id="nitropay-staff-bottom" class="nitropay" />
		</div>
	)
}
