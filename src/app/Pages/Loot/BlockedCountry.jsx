import React from 'react';

export default React.memo(({ country }) => (
  <main className="content loot">
    <div className="fancy-header absolute-unit red">Sorry.</div>
    <div style={{ fontSize: '22px' }}>
      Loot boxes are declared illegal in your country. As a result, you are unable to purchase any boxes.<br />
      Alternatively, click <a href="https://www.google.com/search?q=flights+to+usa">here</a> to find flights to the Land of Freedom.
    </div>
    <div style={{ fontSize: '4px' }}>
      also {country} gay lmao
    </div>
  </main>
));
