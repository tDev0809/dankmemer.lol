import React from 'react';
import './Developer.scss';

export default React.memo(({ name, picture, social, about }) => (
  <div className="staff-member">
    <span className="staff-name blurple">
      {name}
    </span>
    <div className="staff-social">
      <img
        className="staff-picture"
        alt={`${name}'s avatar`}
        src={`/assets/${picture}`}
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
            src={`/assets/${socialName}.svg`}
          />
        </a>
      ))}
    </div>
  </div>
));