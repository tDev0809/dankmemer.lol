import React, { useEffect } from 'react';
import '../../assets/styles/pages/singular/credits.scss';
import users from './data/users.json';
import StaffCard from '../../components/staff';
import images from './util/images.js';

const adPlacements = [
	'nitropay-staff-bottom'
];

const categories = Object.entries(users);
const getSocialIndex = ({ social }) => Object.keys(social).length === 0 ? -1 : 1;

export default function Staff() {
	
	useEffect(() => {
		adPlacements.forEach((placement) => {
			window['nitroAds'].createAd(placement, {
				"refreshLimit": 10,
				"refreshTime": 90,
				"renderVisibleOnly": false,
				"refreshVisibleOnly": true,
				"sizes": [
				  [
					"728",
					"90"
				  ],
				  [
					"320",
					"50"
				  ]
				],
				"report": {
				  "enabled": true,
				  "wording": "Report Ad",
				  "position": "top-right"
				}
			});
		});
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
			<div id="nitropay-staff-bottom" className="nitropay ad-h"/>
		</div>
	)
}
