import React from 'react';
import './Landing.scss';

const data = [
  { name: 'Commands', description: 'See all of the commands Dank Memer has to offer your server!', link: '/commands' },
  { name: 'Premium', description: 'Click here to head to Patreon to see our premium perk selections!', link: 'https://www.patreon.com/join/dankmemerbot?' },
  { name: 'Music Bot', description: 'Everyone needs a decent music bot for their discord servers, why not check out ours?', link: 'https://octave.gg' },
  { name: 'Lootboxes', description: 'Dank Memer? More like EA: Memer edtion, come check out our "surprise mechanics"!', link: '/loot' },
  { name: 'Support', description: 'Have trouble or questions about the bot? Head over to our support server!', link: 'https://discord.gg/meme' },
  { name: 'Apex Legends Bot', description: 'Melmsie is part of a team making a new Apex Legends bot!', link: 'https://discordapp.com/oauth2/authorize?scope=bot&client_id=702604525529202749' }
];

const peepos = Array(7).fill(0).map((_, i) => new Audio(`/static/peepo${i}.mp3`));
let currentAudio = -1;
const playAudio = () =>
  (peepos[++currentAudio] || peepos[currentAudio = 0])
    .play();

export default React.memo(() => (
  <div className='eee'>
    <div>
      <h1 className='title'>thanks for adding <span className='pepple'>dank memer</span></h1>
    </div>
    <div className='list'>
      {data.map(({ name, description, link }) => (
        <a key={name} href={link} className='boxy' onMouseEnter={() => playAudio()}>
          <h1 className='name'>
            <span className='blurple'>
              {name}
            </span>
          </h1>
          <p className='about-text'>
            {description}
          </p>
        </a>
      ))}
    </div>
  </div>
));