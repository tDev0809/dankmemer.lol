import React from 'react';
import './Admin.css';
import { connect } from 'react-redux';
class Admin extends React.Component {
  constructor () {
    super();

    this.state = {
      data: undefined
    }
  }

  async componentDidMount () {
    const data = await fetch('/api/admin/data')
      .then(res => (
        res.ok
          ? res.json()
          : null
      ));

    console.log(data)
    this.setState({ data });
    // ReactGA.pageview('/admin');
  }

  reboot () {
    fetch('/api/admin/actions/reboot', { method: 'POST' });
  }

  render () {
    if (this.state.data === undefined) {
      return <div>Loading...</div>
    } else if (this.state.data === null) {
      return <div>you are not melmsie (or you are not logged in)</div>
    }

    return (
      <div>
        Data: {JSON.stringify(this.state.data, '', '  ')}
        <button onClick={() => this.reboot()}>Reboot Bot</button>
      </div>
    );
  }
}

export default connect(store => store.login, null)(Admin);