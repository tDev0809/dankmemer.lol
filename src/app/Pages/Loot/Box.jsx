import React from 'react';

export default React.memo(({ box, index, activeBox, setActiveBox }) => (
  <div
    className={`box${box.name === activeBox.name ? ' active' : ''}`}
    onClick={() => setActiveBox(index)}
  >
    <div className="box-header">{box.name}</div>
    <div className="box-description">{box.description}</div>
    <div className="box-yield">
      Amount of coins:
      <span className="box-piss"> {box.yield}</span><br />
      A <u>{box.randomItem.chance * 100}%</u> chance at a <i>{box.randomItem.keyword}-tiered</i> item.
    </div>
    <div className="box-price">${box.price.toFixed(2)}</div>
  </div>
));
