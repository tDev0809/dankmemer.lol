import React, { useEffect, useState } from 'react';
import { sanitize } from 'dompurify';
import 'assets/styles/components/staffCard.scss';
import * as socials from '../pages/singular/util/socials.js';
import Marquee from "react-fast-marquee";
const UWU = new Audio(`/static/audio/uwu.wav`);
const playAudio = () => UWU.play();

export default function StaffCard({ name, avatar, social, about }) {

	const [_about, _setAbout] = useState(about);

	useEffect(() => {
		_setAbout(sanitize(about, { USE_PROFILES: { html: false } }));
	}, [about])
	
	return (
  		<div className="staff-card-compact">
    		<div className="staff-card-compact-details">
				<img 
					className="staff-card-compact-details-picture"
					src={avatar}
					onClick={() => { name === 'Melmsie' ? playAudio() : console.log('Go click Mel\'s avatar') }}
				/>
				<div className="staff-card-compact-details-text">
					<h2 className="staff-card-compact-details-name">{name}</h2>
					<div className="staff-card-compact-details-socials">
						{Object.entries(social).map(([ socialName, link ]) => (
							<a key={socialName} href={link}>
								<img className="staff-card-compact-details-socials-account" alt={`${name}'s ${socialName} link`} src={socials[socialName]} />
							</a>
						))}
					</div>
				</div>
			</div>
			<div className="staff-card-compact-about-container">
				<p className={(_about.length > 120) || ((_about.match(/\n/g,) || []).length >= 3) ? "staff-card-compact-details-about v-scroll" : "staff-card-compact-details-about"} dangerouslySetInnerHTML={{ __html: _about }} />	
			</div>
  		</div> 
  	)
};