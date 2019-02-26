import React from 'react';
import './Button.scss';

export default React.memo(({ link, children }) => {
  const button = (
    <button className="button">
      {children}
    </button>
  );

  return link
    ? <a href={link}>{button}</a>
    : button;
});
