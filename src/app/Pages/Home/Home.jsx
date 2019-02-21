import React, { Component } from 'react';
import Button from '../../Button/Button';
import MemerIMG from '../../assets/memer.png';
import './Home.css';
import ReactGA from 'react-ga';

class Home extends Component {
  componentDidMount() {
    ReactGA.pageview('/home');
  }
  render() {
    return(
      <main className="content">
        <div className="home">
          <img className="memer-img" alt="Dank Memer logo - the elusive and beautiful pepe" src={MemerIMG} />
          <span className="home-slogan">THE <span className="blurple">ORIGINAL</span> DISCORD MEME BOT</span>
          <div className="links">
            <a href="https://getdankmemer.today"><Button content="Invite Bot" /></a>
            <a href="https://getdankmemer.today"><Button content="Join Server" /></a>
          </div>
        </div>
      </main>
    )
  }
}

export default Home;