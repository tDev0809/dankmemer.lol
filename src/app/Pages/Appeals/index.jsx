import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../Components/Button';
import rules from './rules.js';

import './appeals.scss';

class Appeals extends Component {
  constructor (props) {
    super(props);

    this.textAreaRef = React.createRef();

    this.state = {
      banType: 'Bot Ban',
      brokenRules: []
    }
  }

  async send () {
    if (!this.state.banType) {
      return alert('You have to select the kind of ban you\'d like to appeal.');
    }
    if (this.textAreaRef.current.value.split(' ').length < 20) {
      return alert('Your appeal must be at least 20 words.');
    }

    const res = await fetch('/api/appeal', {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        banType: this.state.banType,
        body: this.textAreaRef.current.value,
        rules: this.state.brokenRules
      })
    });

    switch (res.status) {
      case 429:
        return this.setState({ finished: (
          <>
            <div className="header">
              You've already recently appealed.
            </div>
            You have to wait before you try again.
          </>
        ) });

      case 200:
        return this.setState({ finished: (
          <>
            <div className="header">
              Your appeal has been sent.
            </div>
            Make sure you keep your direct messages with the bot open.<br />
            If we have any information to give you, the bot will send you a direct message.<br />
            If your appeal is approved or denied, you may not receive a response either way.
          </>
        ) });
    }
  }

  handleRadio (e) {
    this.setState({ banType: e.target.value });
  }

  handleCheckbox (rule) {
    this.setState(prev => ({
      brokenRules: prev.brokenRules.concat(rule)
    }));
  }

  render () {
    if (!this.props.loggedIn) {
      return (
        <div className="content appeal">
          <header className="header">
            You aren't logged in with your Discord account. <a href="/oauth/login?redirect=/appeals">Click this</a> to log in.
          </header>
        </div>
      );
    }

    if (this.state.finished) {
      return (
        <div className="content appeal">
          {this.state.finished}
        </div>
      );
    }

    return (
      <div className="content appeal">
        <section>
          What kind of ban would you like to appeal?<br />
          <label>
            <input
              type="radio"
              value="Bot Ban"
              checked={this.state.banType === 'Bot Ban'}
              onChange={this.handleRadio.bind(this)}
            />
            Bot Ban
          </label>
          <label>
            <input
              type="radio"
              value="Bot Blacklist"
              checked={this.state.banType === 'Bot Blacklist'}
              onChange={this.handleRadio.bind(this)}
            />
            Bot Blacklist
          </label>
          <label>
            <input
              type="radio"
              value="Server Ban"
              checked={this.state.banType === 'Server Ban'}
              onChange={this.handleRadio.bind(this)}
            />
            Server Ban
          </label>
        </section>

        <section>
          Which rules did you break?<br />
          {rules[this.state.banType].map((rule, index) => (
            <label key={rule}>
              <input
                type="checkbox"
                value={rule}
                checked={this.state.brokenRules.includes(rule)}
                onChange={this.handleCheckbox.bind(this, rule)}
              />
              {`${index + 1}. ${rule}`}
            </label>
          ))}
        </section>

        <section>
          <label>
            Write the body of your appeal below. Why should we appeal your ban?<br />

            <textarea
              className="textarea"
              ref={this.textAreaRef}
              rows="12"
            />
          </label>
        </section>

        <section>
          <Button
            onClick={this.send.bind(this)}
          >
            Send
          </Button>
        </section>
      </div>
    );
  }
}

export default connect(store => store.login)(Appeals);