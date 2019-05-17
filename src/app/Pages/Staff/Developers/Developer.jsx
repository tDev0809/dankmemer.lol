import React from 'react';
import './Developer.scss';
import * as socials from './socials.js';

export default React.memo(({ name, picture, social, about }) => (
  <div className="staff-member">
    <span className="staff-name blurple">
      {name}
    </span>
    <div className="staff-social">
      <img
        className="staff-picture"
        alt={`${name}'s avatar`}
        src={picture}
      />
      <p className="staff-about-parent">
        <div className={about.length > 100 ? 'staff-about' : ''}>
          {about}
        </div>
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