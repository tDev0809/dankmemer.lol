import React from 'react';
import './Landing.scss';

const data = [
  { name: 'Commands', description: 'See all of the commands Dank Memer has to offer your server!', link: '/commands' },
  { name: 'Support', description: 'Have trouble or questions about the bot? Head over to our support server!', link: 'https://discord.gg/meme' },
  { name: 'Community', description: 'Want a place to use the bot? Come see our official community server. Giveaways, multipliers, and cool people!', link: 'https://discord.gg/memers' },
  { name: 'Premium', description: 'Click here to head to Patreon to see our premium perk selections!', link: 'https://www.patreon.com/join/dankmemerbot?' },
  { name: 'Lootboxes', description: 'Dank Memer? More like EA: Memer edtion, come check out our "surprise mechanics"!', link: '/loot' },
  { name: 'Twitter', description: 'Follow us on Twitter! We often post polls that affect the bot\'s updates, and love interacting with you all!', link: 'https://twitter.com/dankmemerbot' },
  { name: 'Reddit', description: 'Check out, and take part in, our official subreddit!', link: 'https://www.reddit.com/r/dankmemer/' },
  { name: 'YouTube', description: 'We post tutorial videos on our YouTube channel, subscribe to see new ones sooner!', link: 'https://www.youtube.com/c/DankMemerDiscordBot' }
];

const peepos = Array(13).fill(0).map((_, i) => new Audio(`/static/peepo${i}.mp3`));
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