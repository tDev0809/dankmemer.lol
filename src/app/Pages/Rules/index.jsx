import React from 'react';
import './Rules.css';

export default React.memo(() => (
  <main className="content">
    <section className="header">
      <h1 className="title">Dank Memer Rules</h1>
      <h3 className="rules">
        By using Dank Memer, you agree to these rules.
        If you break any rules, we reserve the right to ban you from Dank Memer
      </h3>
    </section>
    <section className="rule-section">
      <div className="rule">
        <span className="rule-number">Rule One -</span> <span className="rule-head">Userbots, Spamming, and Macros</span>
        <p className="rule-body">Userbotting, macros, scripts and anything else used to automate running commands is strictly forbidden. On top of this, massive amounts of spam is not allowed and will be punished with the same severity.</p>
      </div>
      <div className="rule">
        <span className="rule-number">Rule Two -</span> <span className="rule-head">Sharing Exploits</span>
        <p className="rule-body">Sharing exploits/bugs with other users is forbidden. Please report all bugs to staff on Dank Memer's <a href="https://discord.gg/meme">Support Server</a> so we can fix it as soon as possible.</p>
      </div>
      <div className="rule">
        <span className="rule-number">Rule Three -</span> <span className="rule-head">Coin storage accounts/farming accounts</span>
        <p className="rule-body">Using "alt" accounts to farm or store coins is forbidden. This includes giving coins to real people who don't use the currency system.</p>
      </div>
      <div className="rule">
        <span className="rule-number">Rule Four -</span> <span className="rule-head">Racism, Homophobia, Sexism, Slurs</span>
        <p className="rule-body">None of these things will ever be tolerated. We won't punish you for what you say outside of using our commands, but our commands are never to be used with this.</p>
      </div>
      <div className="rule">
        <span className="rule-number">Rule Five -</span> <span className="rule-head">Advertising</span>
        <p className="rule-body">Using the bot to advertise anything will result in punishment. This includes other discord servers.</p>
      </div>
      <div className="rule">
        <span className="rule-number">Rule Six -</span> <span className="rule-head">Scams, Sales, Trading</span>
        <p className="rule-body">Using bot currency (or any of the bot's features) to scam, trade for, or sell anything is forbidden. For example, giving meme coins in return for people advertising your server.</p>
      </div>
      <div className="rule">
        <span className="rule-number">Rule Seven -</span> <span className="rule-head">Discord TOS and Guidelines</span>
        <p className="rule-body">The <a href="https://discordapp.com/terms">Discord TOS</a> and <a href="https://discordapp.com/guidelines">Discord Community Guidelines</a> also are enforcable through our bot.</p>
      </div>
    </section>
    <ins className="adsbygoogle ad"
          data-ad-client="ca-pub-7326182486296195"
          data-ad-slot="4551035249"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
  </main>
));
