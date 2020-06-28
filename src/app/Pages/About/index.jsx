import React from 'react';
import './About.css';
import ReactDOM from 'react-dom';

export default class Rules extends React.PureComponent {
  componentDidMount () {
    const anchor = location.hash.replace('#', '');
    if (anchor) {
      const domElement = ReactDOM.findDOMNode(this.refs[anchor]);
      if (domElement) {
        domElement.scrollIntoView();
      }
    }
  }

  render () {
    return(
      <main className="content about">
        <div className="good-spacing">
          <h1 ref="about" className="title blurple">About Dank Memer</h1>
          <h2 className="subsection">What is Dank Memer?</h2>
          <p>Dank Memer is a multipurpose yet unique bot, made specifically with "memes" in mind. We do everything that your average multipurpose bot does, but much better and with 100% more sass and memes. Dank Memer is a top notch Meme bot, currency bot, image manipulation bot, and so much more! We have over 250 commands, and that keeps growing. Anything you want or need in your server, we probably handle it!</p>
          <h2 className="subsection">Why Dank Memer?</h2>
          <p>Heyo, Melmsie here. Dank Memer was my very first programming project, used for me to learn JavaScript in late 2016. I realized that there weren't any decent bots doing "memey" things yet. So I made 3 commands <code>!meme</code>, <code>!trigger</code>, and cleverbot. I wanted the bot to be sassy and funny from the start, and from that the idea of Dank Memer was born. I renamed the bot from Markos to Dank Memer, and created it's current account and listed it publically in January of 2017. The rest is history!</p>
          <h2 className="subsection">Why are there paid perks?</h2>
          <p>For the first year of Dank Memer, there was little to no paid features. We really did (and still do) push ourselves to make the most accessible bot we could, and we know not everyone can afford to pay for things. Eventually, our server costs grew, and our work hours with it. We had to make the decision to add premium content. For a while we broke even with server costs, and our development time was falling due to IRL issues. Once Melmsie decided to work on the bot full time as a job, things started picking back up again. Soon after, he was able to raise the bot's income and hire 3 more devs. From there, the bot grew into a fully functional business, and Melmsie now employs 3 people to help with it all!<br></br><br></br>Now while we will always have premium perks, the base features and a vast majority of our commands will always be free. And to those who financially supported us, thank you. Dank Memer wouldn't be alive without you.</p>
          <h2 ref="mmllc" className="subsection">What is Melms Media LLC?</h2>
          <p>No need to worry, Dank Memer isn't owned by some mega corp! Melms Media is the name of the company that was formed specifically to LEGALLY pay taxes and other developers for Dank Memer. There are other things MMLLC will do later as well, it allows us to eventually do more than just Dank Memer! If you have any questions or business inqueries for us as a company, please email <code>admin@dankmemer.gg</code></p>
        </div>

        <div className="good-spacing">
          <h1 ref="basic-usage" className="title blurple">Basic Usage</h1>
            <h2 ref="invites" className="subsection">Adding Dank Memer</h2>
            <p>Dank Memer is able to be added to any server by someone with <code>Manage Server</code> permissions on said server.<br/>
            For most commands, all you need for bot permissions are <code>Send Messages, Read Messages, and Embed Links</code>.</p>
            <h4>Invites for Dank Memer</h4>
            <ul className="invites">
              <li><a href="https://invite.dankmemer.lol">Primary Invite</a></li>
            </ul>
            <p>Also available for your server is our <span className="invites"><a href="https://beta.dankmemer.lol">Beta Bot</a></span><br/>Our beta bot is an "early access" version of Dank Memer. It's not always online or stable, but it usually has sneak peeks at future updates.</p>
            <h2 ref="prefix" className="subsection">Bot Prefix</h2>
            <p>By default, Dank Memer's prefix is <code>pls</code><br/>
            Commands are run like <code>pls meme</code>, there must be a space!</p>
            <p>You are able to change the prefix with <code>pls prefix (prefix of your choice)</code>. Right now you have to keep the space, but this may change in the future.<br/>
            Prefixes are customizable per server, and if you forget the server's custom prefix you can run <code>@Dank Memer hello</code> and the bot will return the current prefix to you.</p>
        </div>
      </main>
    );
  }
}
