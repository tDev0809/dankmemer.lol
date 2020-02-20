import React from 'react';
import './Developer.scss';
import * as socials from './socials.js';
const UWU = new Audio(`/static/uwu.wav`);
const playAudio = () => UWU.play();

export default React.memo(({ name, picture, social, about }) => (
  <div className="staff-member">
    <span className="staff-name blurple">
      {name}
    </span>
    <div className="staff-social">
      <img
        className="staff-picture"
        alt={`${name}'s avatar`}
        onClick={() => {
          name === 'Melmsie' ? playAudio() : console.log('Go click Mel\'s avatar')
        }}
        src={picture}
      />
      <p className="staff-about-parent">
        <div
          className={about.length > 120 ? 'staff-about' : ''}
          dangerouslySetInnerHTML={{ __html: about }}
        />
      </p>
    </div>
    <div className="staff-accounts">
      {Object.entries(social).map(([ socialName, link ]) => (
        <a key={socialName} href={link}>
          <img
            className="staff-account"
            alt={`${name}'s ${socialName} link`}
            src={socials[socialName]}
          />
        </a>
      ))}
    </div>
  </div>
));