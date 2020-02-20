import React from 'react';
import Button from '../../Components/Button/index.jsx';
import MemerIMG from 'assets/memer.png';
import MemesIMG from 'assets/memes.png';
import ModIMG from 'assets/mod.png';
import CurrencyIMG from 'assets/currency.png';
import './Home.scss';

export default React.memo(() => (
  <main className="content index">
    <div className="hero">
      <img className="memer-img" alt="Dank Memer logo - the elusive and beautiful pepe (Also the best Discord Bot around)" src={MemerIMG} />
      <span className="home-slogan">
        DISCORD'S FAVORITE <span className="blurple">MEME</span>/<span className="blurple">CURRENCY</span> BOT
      </span>
      <div className="links">
        <Button link="https://invite.dankmemer.lol">
          Add Bot
        </Button>
        <Button link="/commands">
          Commands
        </Button>
        <Button link="https://discord.gg/meme">
          Get Support
        </Button>
      </div>
    </div>
    <section>
      <img alt="Two of Dank Memer's MANY memey commands - pls meme and pls floor" src={MemesIMG}/>
      <div className="text-area">
        <span className="section-title blurple">
          MEME COMMANDS
        </span>
        <p className="section-body">Dank Memer has 100+ meme commands, with a lot of them specializing in helping you generate your own memes. Browse our <a href="/commands">commands page</a> for the Memey and Image categories!</p>
        </div>
    </section>
    <section className="reverse">
      <img height="15rem!important;" alt="Dank Memer is an in depth and unique + funny currency bot along with all our other features" src={CurrencyIMG}/>
      <div className="text-area">
        <span className="section-title blurple">
          CURRENCY FEATURES
        </span>
        <p className="section-body">Dank Memer has one of the most unique and fun currency systems of any Discord Bots. With stealing, gambling, bankrobbing, unique/funny items, and so much more, we'll spice up your server ;)</p>
        </div>
    </section>
    <section>
      <img height="15rem!important;" alt="Dank Memer has many moderation bot commands to add security to your discord server" src={ModIMG}/>
      <div className="text-area">
        <span className="section-title blurple">
          MODERATION COMMANDS
        </span>
        <p className="section-body">Dank Memer has refreshingly in depth moderation system, without taking a PHD to know how to set up and understand it! From basic commands like bans and mutes, to more advanced commands such as mass nicknames and "decancering" usernames that are hard to read, we have it all!</p>
        </div>
    </section>
  </main>
));
