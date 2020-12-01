import React from 'react';
import 'assets/styles/pages/singular/landing.scss';

const data = [
  { name: 'Commands', description: 'See all of the commands Dank Memer has to offer your server!', link: '/commands' },
  { name: 'FAQ', description: 'Have some questions? See if we\'ve already answered it on this page!', link: '/faq' },
  { name: 'Support', description: 'FAQ page not enough to help? Head over to our support server!', link: 'https://discord.gg/meme' },
  { name: 'Premium', description: 'Click here to head to Patreon to see our premium perk selections!', link: 'https://www.patreon.com/join/dankmemerbot?' },
  { name: 'Lootboxes', description: 'Dank Memer? More like EA: Memer edtion, come check out our "surprise mechanics"!', link: '/loot' },
  { name: 'Twitter', description: 'Follow us on Twitter! We love interacting with you all and shitposting!!', link: 'https://twitter.com/dankmemerbot' },
  { name: 'Reddit', description: 'Check out, and take part in, our official subreddit!', link: 'https://www.reddit.com/r/dankmemer/' },
  { name: 'YouTube', description: 'We post tutorial videos on our YouTube channel, subscribe to see new ones sooner!', link: 'https://www.youtube.com/c/DankMemerDiscordBot' }
];

const peepos = Array(13).fill(0).map((_, i) => new Audio(`/static/peepo${i}.mp3`));
let currentAudio = -1;
const playAudio = () =>
  (peepos[++currentAudio] || peepos[currentAudio = 0])
    .play();


    export default class Landing extends React.PureComponent {
      componentDidMount () {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    
      render () {
        return(
          <div className='eee'>
            <div>
              <h1 className='title'>thanks for adding <span className='pepple'>dank memer</span></h1>
            </div>
            <div align="center">
          <ins className="adsbygoogle ad"
            data-ad-client="ca-pub-7326182486296195"
            data-ad-slot="4551035249">
          </ins>
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
            <div align="center">
          <ins className="adsbygoogle ad"
            data-ad-client="ca-pub-7326182486296195"
            data-ad-slot="5725651587">
          </ins>
        </div>
          </div>
        );
      }
    }
