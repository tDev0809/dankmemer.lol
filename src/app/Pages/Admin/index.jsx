import React from 'react';
import './Admin.scss';
import { connect } from 'react-redux';

import BanPanels from './panels/banPanels';
import GetPayment from './panels/GetPayment';

class Admin extends React.PureComponent {
  render () {
    if (!this.props.loggedIn) {
      return (
        <div className="content admin">
          <header className="header">
            You aren't logged in with your Discord account. <a href="/oauth/login?redirect=/admin">Click this</a> to log in.
          </header>
        </div>
      );
    }

    if (this.props.isAdmin === false) {
      return location.replace('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    }

    return (
      <>
      <div className="content admin">
        {BanPanels.map((Panel, key) => (<Panel key={key} />))}
        {<GetPayment/>}
      </div>
      <ins className="adsbygoogle"
          style={{display:'block'}}
          data-ad-client="ca-pub-7326182486296195"
          data-ad-slot="4551035249"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
      </>
    );
  }
}

export default connect(store => store.login, null)(Admin);
