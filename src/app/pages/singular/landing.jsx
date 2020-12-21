import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import 'assets/styles/pages/singular/landing.scss';
import createAd from '../../util/createAd';

const cardData = [
  { name: 'Commands', description: 'See all of the commands Dank Memer has to offer your server!', link: '/commands' },
  { name: 'FAQ', description: 'Have some questions? See if we\'ve already answered it on this page!', link: '/faq' },
  { name: 'Support', description: 'FAQ page not enough to help? Head over to our support server!', link: 'https://discord.gg/meme' },
  { name: 'Premium', description: 'Click here to head to Patreon to see our premium perk selections!', link: 'https://www.patreon.com/join/dankmemerbot?' },
  { name: 'Lootboxes', description: 'Dank Memer? More like EA: Memer edtion, come check out our "surprise mechanics"!', link: '/loot' },
  { name: 'Twitter', description: 'Follow us on Twitter! We love interacting with you all and shitposting!!', link: 'https://twitter.com/dankmemerbot' },
  { name: 'Reddit', description: 'Check out, and take part in, our official subreddit!', link: 'https://www.reddit.com/r/dankmemer/' },
  { name: 'YouTube', description: 'We post tutorial videos on our YouTube channel, subscribe to see new ones sooner!', link: 'https://www.youtube.com/c/DankMemerDiscordBot' }
];

export default function Landing(props) {
	window.scroll(0,0)
	const history = useHistory();

	useEffect(() => {
		createAd('nitropay-landing-top', { sizes: [ [728, 90] ] }, 'desktop');
		createAd('nitropay-landing-top', { sizes: [
			[320, 50],
			[300, 50],
			[300, 250]
		] }, 'mobile');
	
		createAd('nitropay-landing-bottom', {
			sizes: [
				[728, 90],
				[970, 90],
			],
			renderVisibleOnly: true
		}, 'desktop');
		createAd('nitropay-landing-bottom', {
			sizes: [
				[320, 50],
				[300, 50],
				[300, 250]
			],
			renderVisibleOnly: true
		}, 'mobile');
	});

	return (
		<div id="landing">
			<h1 id="landing-title">Thanks for adding<br/><span className="text-highlight">Dank Memer</span></h1>
			<div id="nitropay-landing-top" className="nitropay" />
			<div id="landing-cards">
				{cardData.map((card, i) => (
					<div className="landing-card" key={i} onClick={() => {
						if(card.link.startsWith("/")) history.push(card.link);
						else window.location.href = card.link;
					}}>
						<h3 className="landing-card-name">{card.name}</h3>
						<p className="landing-card-text">{card.description}</p>
					</div>
				))}
			</div>
			<div id="nitropay-landing-bottom" className="nitropay" />
		</div>
	)
}