import React from 'react';
import ReactDOM from 'react-dom';
import Button from '../../Components/Button/index.jsx';
import MemerIMG from 'assets/memer.png';
import MemesIMG from 'assets/memes.png';
import InsightIMG from 'assets/insights.png';
import InvitesIMG from 'assets/invites.png';
import CurrencyIMG from 'assets/currency.png';
import './Home.scss';

export default class Home extends React.PureComponent {
  componentDidMount () {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
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
      <main className="content index">
    <div className="hero">
      <img className="memer-img" alt="Dank Memer logo - the elusive and beautiful pepe (Also the best Discord Bot around)" src={MemerIMG} />
      <span className="home-slogan">
        DISCORD'S FAVORITE <span className="blurple">FUN</span> BOT
      </span>
      <span className="home-tag">Increase your server's activity, <span className='underline'>easily.</span></span>
      <div className="links">
        <Button link="https://invite.dankmemer.lol">
          Add Bot
        </Button>
        <Button link="/commands">
          Commands
        </Button>
      </div>
      <div align="center">
          <ins className="adsbygoogle ad"
            data-ad-client="ca-pub-7326182486296195"
            data-ad-slot="4551035249"
            data-ad-format="auto"
            data-full-width-responsive="true">
          </ins>
        </div>
    </div>
    <section className="reverse">
      <img height="15rem!important;" alt="Dank Memer is an in depth and unique + funny currency bot along with all our other features" src={CurrencyIMG}/>
      <div className="text-area">
        <span ref="currency" className="section-title blurple">
          CURRENCY FEATURES
        </span>
        <p className="section-body">Dank Memer has one of the most unique and fun currency systems of any Discord Bots. With stealing, gambling, bankrobbing, unique/funny items, and so much more, we'll spice up your server ;)</p>
        </div>
    </section>
    <section>
      <img alt="Two of Dank Memer's MANY memey commands - pls meme and pls floor" src={MemesIMG}/>
      <div className="text-area">
        <span ref="memes" className="section-title blurple">
          MEME COMMANDS
        </span>
        <p className="section-body">Dank Memer has 100+ meme commands, with a lot of them specializing in helping you generate your own memes. Browse our <a href="/commands">commands page</a> for the Memey and Image categories!</p>
        </div>
    </section>
    <div align="center">
          <ins className="adsbygoogle ad"
            data-ad-client="ca-pub-7326182486296195"
            data-ad-slot="4551035249"
            data-ad-format="auto"
            data-full-width-responsive="true">
          </ins>
        </div>
    <section className="reverse">
      <img height="15rem!important;" alt="Dank Memer is a popular bot, and in many cases raises a server's activity levels by a TON!" src={InsightIMG}/>
      <div className="text-area">
        <span ref="activity" className="section-title blurple">
          BUILD SERVER ACTIVITY
        </span>
        <p className="section-body">With over 12 million active users, growing at about 300k new users a month, you will attract people to join and participate in your server just by having our bot. It's very community based, and has lots of ways to interact with other server members.</p>
        </div>
    </section>
    <section>
      <img alt="We have two GIANT community servers for Dank Memer. One is for bot support, the other is for hanging out with other users and giveaways!" src={InvitesIMG}/>
      <div className="text-area">
        <span ref="servers" className="section-title blurple">
          MASSIVE COMMUNITY SERVERS
        </span>
        <p className="section-body">We have to GIANT servers for you to join, all about Dank Memer! One is purely for support and announcements, and the other is a community server based around using the bot and participating in giveaways of our currency system!</p>
        </div>
    </section>
    <div className="call-to-action">
      <span className="action-text">Join the growing Dank Memer family, today.</span>
      <div className="links">
        <Button link="https://invite.dankmemer.lol">
          Add Bot
        </Button>
        <Button link="/commands">
          Commands
        </Button>
      </div>
      <div align="center">
          <ins className="adsbygoogle ad"
            data-ad-client="ca-pub-7326182486296195"
            data-ad-slot="4551035249"
            data-ad-format="auto"
            data-full-width-responsive="true">
          </ins>
        </div>
    </div>
  </main>
    );
  }
}