import React, { useEffect, useState } from 'react';
import { sanitize } from 'dompurify';
import 'assets/styles/components/staffCard.scss';
import * as socials from '../pages/singular/util/socials.js';
import Marquee from "react-fast-marquee";
const UWU = new Audio(`/static/audio/uwu.wav`);
const playAudio = () => UWU.play();

export default function StaffCard({ name, avatar, social, about, role }) {

	const [_about, _setAbout] = useState(about);

	useEffect(() => {
		_setAbout(sanitize(about, { USE_PROFILES: { html: false } }));
	}, [about])
	
	return (
  		<div className="staff-card-large">
    		<div className="staff-card-large-details">
				<img 
					className="staff-card-large-details-picture"
					src={avatar}
					onClick={() => { name === 'Melmsie' ? playAudio() : console.log('Go click Mel\'s avatar') }}
				/>
				<div className="staff-card-large-details-text">
					<h2 className="staff-card-large-details-name">{name}</h2>
					<p className="staff-card-large-details-role">{role}</p>
					<div className={Object.entries(social).length <= 3 ? "staff-card-large-details-socials" : "staff-card-large-details-socials no-grid"}>
						{Object.entries(social).length <= 3 ?
							Object.entries(social).map(([ socialName, link ]) => (
								<a key={socialName} href={link}>
									<img className="staff-card-large-details-socials-account" alt={`${name}'s ${socialName} link`} src={socials[socialName]} />
								</a>
							))
							: 
							<Marquee
								gradient={false}
								speed={20}
								pauseOnHover={true}
								style={{
									height: "unset"
								}}
							>
								{Object.entries(social).map(([ socialName, link ]) => (
									<a key={socialName} href={link}>
										<img className="staff-card-large-details-socials-account" alt={`${name}'s ${socialName} link`} src={socials[socialName]} />
									</a>
								))}
							</Marquee>
						}
					</div>
				</div>
			</div>
			<div className="staff-card-large-about-container">
				<p className={_about.length > 120 ? "staff-card-large-details-about v-scroll" : "staff-card-large-details-about"} dangerouslySetInnerHTML={{ __html: _about }} />	
			</div>
  		</div> 
  	)
};