import React from 'react';
import './Button.scss';

export default React.memo(({ link, children, onClick }) => {
  const button = (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );

  return link
    ? <a href={link}>{button}</a>
    : button;
});
