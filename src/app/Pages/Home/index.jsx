import React from 'react';
import Button from '../../Components/Button/index.jsx';
import MemerIMG from 'assets/memer.png';
import './Home.scss';

export default React.memo(() => (
  <main className="content index">
    <div className="home">
      <img className="memer-img" alt="Dank Memer logo - the elusive and beautiful pepe" src={MemerIMG} />
      <span className="home-slogan">
        THE <span className="blurple">ORIGINAL</span> DISCORD MEME BOT
      </span>
      <div className="links">
        <Button link="https://invite.dankmemer.lol">
          Add Bot
        </Button>
        <Button link="https://discord.gg/meme">
          Get Support
        </Button>
      </div>
    </div>
  </main>
));
