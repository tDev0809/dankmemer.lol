import React from 'react';
import './Admin.scss';
import { connect } from 'react-redux';

class Admin extends React.PureComponent {
  constructor () {
    super();

    this.state = {
      banType: 'appeal',
      banID: ''
    };
  }

  async ban () {
    if (!this.state.banID) {
      return alert('enter a user id dumb cunt');
    }

    const res = await fetch('/api/admin/ban', {
      method: 'POST',
      body: JSON.stringify({
        type: this.state.banType,
        id: this.state.banID
      }),
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    switch (res.status) {
      case 200:
        alert(`Successfully banned ${this.state.banID}`);
        return this.setState({
          banID: ''
        });

      default:
        alert(`Unknown HTTP response code: ${res.status}`);
    }
  }

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
      <div className="content admin">
        <section>
          <div class="section-header">Ban User</div>

          <label>
            Ban Type<br />
            <select
              value={this.banType}
              onChange={e => this.setState({ banType: e.target.value })}
            >
              <option value="Lootbox">Lootbox</option>
              <option value="Appeal">Appeal</option>
            </select>
          </label>

          <label>
            User ID<br />
            <input
              value={this.state.banID}
              onChange={e => !isNaN(e.target.value) && this.setState({ banID: e.target.value })}
            />
          </label>

          <label>
            <button onClick={() => this.ban()}>Hammer</button>
          </label>
        </section>
      </div>
    );
  }
}

export default connect(store => store.login, null)(Admin);
