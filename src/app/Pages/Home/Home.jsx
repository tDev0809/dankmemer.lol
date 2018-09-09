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
        <Button content="Invite Now!" link="https://discordapp.com/oauth2/authorize?client_id=270904126974590976&scope=bot&permissions=3533888"/>
      </div>
        
      </div>
    )
  }
}

export default Home;