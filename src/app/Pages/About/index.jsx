import React, { PureComponent } from 'react';
import './About.css';
import ReactGA from 'react-ga';
import ReactDOM from 'react-dom';

export default class Rules extends PureComponent {
  componentDidMount() {
    ReactGA.pageview('/about');
  }
  componentDidUpdate() {
    const anchor = this.props.location.hash.replace('#', '');
    if (anchor) {
      const domElement = ReactDOM.findDOMNode(this.refs[anchor]);
      if (domElement) {
        domElement.scrollIntoView();
      }
    }
  }
    render() {
      return(
        <main className="content about">
          <div className="good-spacing">
            <h1 ref="about" className="title blurple">About Dank Memer</h1>
            <h2 className="subsection">What is Dank Memer?</h2>
            <p>Dank Memer is a multipurpose yet unique bot, made specifically with "memes" in mind. We do everything that your average multipurpose bot does, but much better and with 100% more sass and memes. Dank Memer is a top notch Meme bot, music bot, currency bot, moderation bot, image manipulation bot, and so much more! We have over 260 commands, and that keeps growing. Anything you want or need in your server, we probably handle it!</p>
            <h2 className="subsection">Why Dank Memer?</h2>
            <p>Heyo, Melmsie here. Dank Memer was my very first programming project, used for me to learn JavaScript in late 2016. I realized that there weren't any decent bots doing "memey" things yet. So I made 3 commands <code>!meme</code>, <code>!trigger</code>, and cleverbot. I wanted the bot to be sassy and funny from the start, and from that the idea of Dank Memer was born. I renamed the bot from Markos to Dank Memer, and created it's current account and listed it publically in January of 2017. The rest is history!</p>
          </div>

          <div className="good-spacing">
            <h1 ref="basic-usage" className="title blurple">Basic Usage</h1>
              <h2 ref="invites" className="subsection">Adding Dank Memer</h2>
              <p>Dank Memer is able to be added to any server by someone with <code>Manage Server</code> permissions on said server.<br/>
              For most commands, all you need for bot permissions are <code>Send Messages, Read Messages, and Embed Links</code>. For more advanced commands (such as moderation), you'll need more permissions that involve server moderation.</p>
              <h4>Invites for Dank Memer</h4>
              <ul className="invites">
                <li><a href="https://getdankmemer.today">Primary Invite</a></li>
                <li><a href="https://minimal.getdankmemer.today">Minimum Permissions</a></li>
                <li><a href="https://max.getdankmemer.today">Maximum Permissions</a></li>
              </ul>
              <p>Also available for your server is our <span className="invites"><a href="https://discordapp.com/oauth2/authorize?client_id=499383056822435840&scope=bot&permissions=1060498550">Beta Bot</a></span><br/>Our beta bot is an "alpha" version of Dank Memer. It's not always online or stable, but it usually has sneak peeks at future updates</p>
              <h2 ref="prefix" className="subsection">Bot Prefix</h2>
              <p>By default, Dank Memer's prefix is <code>pls</code><br/>
              Commands are run like <code>pls meme</code>, there must be a space!</p>
              <p>You are able to change the prefix with <code>pls prefix (prefix of your choice)</code>. Right now you have to keep the space, but this may change in the future.<br/>
              Prefixes are customizable per server, and if you forget the server's custom prefix you can run <code>@Dank Memer hello</code> and the bot will return the current prefix to you.</p>
          </div>
        </main>
      )
  }
}