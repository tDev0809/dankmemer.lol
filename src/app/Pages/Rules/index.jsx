import React, { PureComponent } from 'react';
import './Rules.css';
import ReactGA from 'react-ga';

export default class Rules extends PureComponent {
  componentDidMount () {
    ReactGA.pageview('/rules');
  }

  render () {
    return (
      <main className="content">
      <h1 className="title">Dank Memer Rules</h1>
        <h3 className="rules">By using Dank Memer, you agree to these rules.
        If you break any rules, we reserve the right to ban you from Dank Memer</h3>
        <p className="rules">Userbots, spamming, and macros are forbidden</p>
        <p className="rules">Sharing exploits is forbidden</p>
        <p className="rules">Coin storage accounts/farming accounts (alts) are forbidden</p>
        <p className="rules">Offensive/advertising names on the leaderboard will be wiped and blacklisted</p>
        <p className="rules">Do not use the bot for racism, homophobia, or advertising</p>
        <p className="rules">Coins are not to be used in scams or invite servers. Example: giving people meme coins to invite as many people as possible</p>
        <p className="rules">Selling meme coins, especially mass advertising, is strictly forbidden.</p>
      </main>
    );
  }
}