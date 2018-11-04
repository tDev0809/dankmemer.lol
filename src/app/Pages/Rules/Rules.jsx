import React, { Component } from 'react';
import './Rules.css';

class Rules extends Component {
  render() {
    return(
      <div className="content">
      <h1 className="title">Dank Memer Rules</h1>
        <h3 className="rules">By using Dank Memer, you agree to these rules.
        If you break any rules, we reserve the right to ban you from Dank Memer</h3>
        <p className="rules">Userbots and macros are forbidden</p>
        <p className="rules">Sharing exploits is forbidden</p>
        <p className="rules">Do not use the bot for racism or homophobia</p>
      </div>
    )
  }
}

export default Rules;