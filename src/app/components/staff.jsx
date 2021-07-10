import React, { useEffect, useState } from 'react';
import 'assets/styles/components/staffCard.scss';
import * as socials from '../pages/singular/util/socials.js';
import * as axios from 'axios';
import images from '../pages/singular/util/images.js';
import fallbackAvatar from 'assets/img/staff/fallback.gif';
const UWU = new Audio(`/static/audio/uwu.wav`);
const playAudio = () => UWU.play();

export default function StaffCard({ name, avatar, social, about }) {

	const [_avatar, _SetAvatar] = useState(avatar || images[name.toLowerCase().replace(/ /g, '--')]);

 	useEffect(() => {
		axios(_avatar).catch(e => {
			_SetAvatar(fallbackAvatar);
		})
	}, []);
	

	return (
  		<div className="staff-card">
    		<div className="staff-card-details">
				<img 
					className="staff-card-details-picture"
					src={_avatar}
					onClick={() => { name === 'Melmsie' ? playAudio() : console.log('Go click Mel\'s avatar') }}
				/>
				<p className="staff-card-details-name">{name}</p>
      			<div className="staff-card-details-about-container">
				  <p className={about.replace(/<(?<=<)(.*?)(?=>)>/g, '').length > 120 ? "staff-card-details-about v-scroll" : "staff-card-details-about"} dangerouslySetInnerHTML={{ __html: about.replace(/<(?<=<)(.*?)(?=>)>/g, '') }} />	
				</div>
			</div>
    		<div className="staff-card-socials">
      			{Object.entries(social).map(([ socialName, link ]) => (
        			<a key={socialName} href={link}>
          				<img className="staff-card-socials-account" alt={`${name}'s ${socialName} link`} src={socials[socialName]} />
        			</a>
      			))}
    		</div>
  		</div> 
  	)
};