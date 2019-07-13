import React from 'react';
import Button from '../../Components/Button/index.jsx';
import MemerIMG from 'assets/memer.webp';
import MemesIMG from 'assets/memes.webp';
import MusicIMG from 'assets/music.webp';
import './Home.scss';

export default React.memo(() => (
  <main className="content index">
    <div className="hero">
      <img className="memer-img" alt="Dank Memer logo - the elusive and beautiful pepe (Also the best Discord Bot around)" src={MemerIMG} />
      <span className="home-slogan">
        THE <span className="blurple">ONLY</span> DISCORD BOT YOU NEED
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
      <img height="15rem!important;" alt="An example of Dank Memer's Music Bot functionality" src={MusicIMG}/>
      <div className="text-area">
        <span className="section-title blurple">
          MUSIC FEATURES
        </span>
        <p className="section-body">Dank Memer has completely free music for all servers to use! With additions like custom playlists, Spotify support, and bass boosting, you can't go wrong with us!</p>
        </div>
    </section>
  </main>
));
