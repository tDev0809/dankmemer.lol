import React, { PureComponent } from 'react';
import Button from '../../Components/Button/index.jsx';
import './Home.scss';
import ReactGA from 'react-ga';

export default class Home extends PureComponent {
  componentDidMount () {
    ReactGA.pageview('/home');
  }

  render () {
    return (
      <main className="content index">
        <div className="home">
          <img className="memer-img" alt="Dank Memer logo - the elusive and beautiful pepe" src="/assets/memer.png" />
          <span className="home-slogan">
            THE <span className="blurple">ORIGINAL</span> DISCORD MEME BOT
          </span>
          <div className="links">
            <Button link="https://invite.dankmemer.lol">
              Invite Bot
            </Button>
            <Button link="https://discord.gg/FnP8m6q">
              Join Server
            </Button>
          </div>
        </div>
      </main>
    );
  }
}
