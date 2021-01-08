import React from 'react';
import 'assets/styles/components/staffCard.scss';
import * as socials from '../pages/singular/util/socials.js';
import images from '../pages/singular/util/images.js';
const UWU = new Audio(`/static/audio/uwu.wav`);
const playAudio = () => UWU.play();

export default function StaffCard({ name, avatar, social, about }) {
	return (
  		<div className="staff-card">
    		<div className="staff-card-details">
      			<img className="staff-card-details-picture" src={avatar || images[name.toLowerCase().replace(/ /g, '-')]} alt={`${name}'s avatar`} onClick={() => {
          			name === 'Melmsie' ? playAudio() : console.log('Go click Mel\'s avatar')
        		}} />
				<p className="staff-card-details-name">{name}</p>
      			<div className="staff-card-details-about-container">
				  <p className={about.length > 120 ? "staff-card-details-about scroll" : "staff-card-details-about"} dangerouslySetInnerHTML={{ __html: about }} />	
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