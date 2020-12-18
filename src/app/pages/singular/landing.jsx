import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import 'assets/styles/pages/singular/landing.scss';

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

const adPlacements = [
	'nitropay-landing-top',
	'nitropay-landing-bottom'
]

export default function Landing(props) {
	const history = useHistory();

	// adPlacements.forEach((placement) => {
	// 	window['nitroAds'].createAd(placement, {
	// 		"refreshLimit": 10,
	// 		"refreshTime": 90,
	// 		"renderVisibleOnly": false,
	// 		"refreshVisibleOnly": true,
	// 		"sizes": [
	// 		  [
	// 			"728",
	// 			"90"
	// 		  ],
	// 		  [
	// 			"320",
	// 			"50"
	// 		  ]
	// 		],
	// 		"report": {
	// 		  "enabled": true,
	// 		  "wording": "Report Ad",
	// 		  "position": "top-right"
	// 		}
	// 	});
	// });

	return (
		<div id="landing">
			<h1 id="landing-title">Thanks for adding<br/><span className="text-highlight">Dank Memer</span></h1>
			<div id="nitropay-landing-top" className="nitropay ad-h"/>
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
			<div id="nitropay-landing-top" className="nitropay ad-h"/>
		</div>
	)
}