import React, { Component } from 'react';
import Button from '../../Button/Button';
import MemerIMG from '../../assets/memer.png';
import './Home.css';

class Home extends Component {
  render() {
    return(
      <div className="content">
      <div className="home">
        <img className="memer-img" height="250" width="250" src={MemerIMG} />
        <span className="home-slogan">THE <span className="blurple">ORIGINAL</span> DISCORD MEME BOT</span>
        <a href="https://goo.gl/ZHSsby"><Button content="Invite Now!" /></a>
      </div>
        
      </div>
    )
  }
}

export default Home;