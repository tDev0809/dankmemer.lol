import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../Components/Button';
import rules from './rules.js';

import './reports.scss';

class Reports extends Component {
  textAreaRef = React.createRef();
  state = {
    reportType: 'User Report',
    brokenRules: []
  }

  async send () {
    if (!this.state.reportType) {
      return alert('You have to select the kind of report you\'d like to file.');
    }
    if (this.textAreaRef.current.value.split(' ').length < 20) {
      return alert('Your report must be at least 20 words.');
    }
    if (this.state.brokenRules.length === 0) {
      return alert('You must tick at least one broken rule.');
    }

    const res = await fetch('/api/report', {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        reportType: this.state.reportType,
        body: this.textAreaRef.current.value,
        rules: this.state.brokenRules
      })
    });

    switch (res.status) {
      case 429:
        return this.setState({ finished: (
          <>
            <div className="header">
              You've already recently reported someone.
            </div>
            You have to wait before you do it again.
          </>
        ) });

      case 200:
        return this.setState({ finished: (
          <>
            <div className="header">
              Your report has been sent.
            </div>
            Make sure you keep your direct messages with the bot open.<br />
            If we have any information to ask for, the bot will send you a direct message.<br />
            We will not notify you if a ban has happened or not, for privacy reasons.
          </>
        ) });

      case 403:
        return this.setState({ finished: (
          <>
            <div className="header">
              You have been banned from reporting people.
            </div>
            Report bans are un-appealable. Good job. I'm proud of you.
          </>
        ) });
    }
  }

  handleRadio (e) {
    this.setState({ reportType: e.target.value });
  }

  handleCheckbox (rule) {
    this.setState(prev => ({
      brokenRules: prev.brokenRules.includes(rule)
        ? prev.brokenRules.filter(brokenRule => brokenRule !== rule)
        : prev.brokenRules.concat(rule)
    }));
  }

  render () {
    /*if (!this.props.loggedIn) {
      return (
        <div className="content appeal">
          <header className="header">
            You aren't logged in with your Discord account. <a href="/oauth/login?redirect=/appeals">Click this</a> to log in.
          </header>
        </div>
      );
    }*/

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
          Which type of report is this?<br />
          <label>
            <input
              type="radio"
              value="User Report"
              checked={this.state.reportType === 'User Report'}
              onChange={this.handleRadio.bind(this)}
            />
            User Report
          </label>
          <label>
            <input
              type="radio"
              value="Server Report"
              checked={this.state.reportType === 'Server Report'}
              onChange={this.handleRadio.bind(this)}
            />
            Server Report
          </label>
        </section>

        <section>
          Which rules did they break?<br />
          {rules[this.state.reportType].map((rule, index) => (
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
            Write the body of your report below. If you don't include an ID, the report is useless.<br />
            <a target="_blank" href="https://support.discordapp.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-">HOW TO GET THEIR ID????</a><br />
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

export default connect(store => store.login)(Reports);