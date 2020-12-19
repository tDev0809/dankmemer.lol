import React, { useEffect } from 'react';
import MemesIMG from 'assets/img/memes.png';
import InsightIMG from 'assets/img/insights.png';
import InvitesIMG from 'assets/img/invites.png';
import CurrencyIMG from 'assets/img/currency.png';
import 'assets/styles/pages/singular/home.scss';
import BottomCTA from '../../components/bottomCTA';

const adPlacements = [
	'nitropay-home-middle',
	'nitropay-home-bottom'
]

export default function Home () {

	useEffect(() => {
		window.scroll(0,0)
		adPlacements.forEach((placement) => {
			window.nitroAds && window.nitroAds.createAd(placement, {
				"refreshLimit": 10,
				"refreshTime": 30,
				"renderVisibleOnly": true,
				"refreshVisibleOnly": true,
				"sizes": [
				  [
					"728",
					"90"
				  ],
				  [
					"320",
					"50"
				  ]
				],
				"report": {
				  "enabled": true,
				  "wording": "Report Ad",
				  "position": "top-right"
				}
			});
		});
	}, [])

	return (
		<div id="home" className={!window.nitroAds ? 'nitro-margin' : ''}>
    		<div id="home-hero">
				<div id="home-hero-text">
					<h1 id="home-hero-text-title">Dank Memer</h1>
					<p id="home-hero-text-slogan">Increase your server's activity <span className="text-highlight">easily</span> with Discord's favorite <span className="text-highlight">fun</span> bot.</p>					
				</div>
				<div id="home-hero-cta">
					<a id="home-hero-cta-invite" href="https://invite.dankmemer.lol" rel="noreferrer noopener">Invite now</a>
				</div>
				<div id="home-hero-circles">
					<svg height="500" width="1020">
						<circle cx="190" cy="320" r="157.5" fill="#242424"/>
						<circle cx="300" cy="50" r="50" fill="#242424"/>
						<circle cx="700" cy="100" r="15" fill="#242424"/>
						<circle cx="890" cy="120" r="107.5" fill="#242424"/>
						<circle cx="930" cy="400" r="65" fill="#242424"/>
						<circle cx="560" cy="450" r="25" fill="#242424"/>
					</svg>
				</div>
    		</div>
    		<section>
      			<div className="text-area">
        			<h3 className="section-title"><span className="text-highlight">Extensive</span> Currency<br/> Features</h3>
        			<p className="section-body short">Dank Memer has one of the most unique and fun currency systems of any Discord Bot. With stealing, gambling, bank robbing, unique and funny items, and so much more, we'll spice up your server!</p>
        		</div>
				<img height="15rem!important;" alt="Dank Memer is an in depth and unique + funny currency bot along with all our other features" src={CurrencyIMG}/>
    		</section>
    		<section className="reverse">
				<div className="text-area">
					<h3 className="section-title"><span className="text-highlight">Fantastic</span> Meme<br/> Commands</h3>
					<p className="section-body">Dank Memer has 100+ meme commands, with a lot of them specializing in helping you generate your own memes. Browse our <a href="/commands">commands page</a> for the Memey and Image categories!</p>
        		</div>
				<img alt="Two of Dank Memer's MANY memey commands - pls meme and pls floor" src={MemesIMG}/>
    		</section>
			<div id="nitropay-home-middle" className={window.nitroAds ? "nitropay ad-h" : 'nitropay ad-h blocked'}/>
			<section>
				<div className="text-area">
					<h3 className="section-title"><span className="text-highlight">Generate</span> Server<br/> Growth</h3>
					<p className="section-body">With over 12 million active users, growing at about 300k new users a month, you will attract people to join and participate in your server just by having our bot. It's very community based, and has lots of ways to interact with other server members.</p>
				</div>
				<img height="15rem!important;" alt="Dank Memer is a popular bot, and in many cases raises a server's activity levels by a TON!" src={InsightIMG}/>
			</section>
			<section className="reverse">
				<div className="text-area">
					<h3 className="section-title"><span className="text-highlight">Massive</span> Community<br/> Servers</h3>
					<p className="section-body">We have to GIANT servers for you to join, all about Dank Memer! One is purely for support and announcements, and the other is a community server based around using the bot and participating in giveaways of our currency system!</p>
				</div>
				<img id="homepage-snowflake-image" alt="We have two GIANT community servers for Dank Memer. One is for bot support, the other is for hanging out with other users and giveaways!" src={InvitesIMG}/>
			</section>
			<div id="nitropay-home-bottom" className={window.nitroAds ? "nitropay ad-h" : 'nitropay ad-h blocked'}/>
			<BottomCTA/>
			<span data-ccpa-link="1"></span>
  		</div>
	);
}