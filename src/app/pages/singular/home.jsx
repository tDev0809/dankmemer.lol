import React, { useEffect } from 'react';
import Button from '../../components/button.jsx';
import MemerIMG from 'assets/img/memer.png';
import MemesIMG from 'assets/img/memes.png';
import InsightIMG from 'assets/img/insights.png';
import InvitesIMG from 'assets/img/invites.png';
import CurrencyIMG from 'assets/img/currency.png';
import 'assets/styles/pages/singular/home.scss';

export default function Home () {

	useEffect(() => {
		(window.adsbygoogle = window.adsbygoogle || []).push({});
		(window.adsbygoogle = window.adsbygoogle || []).push({});
	}, [])

	return (
		<div id="home">
    		<div id="home-hero">
				<div id="home-hero-text">
					<h1 id="home-hero-title">Dank Memer</h1>
					<p id="home-hero-slogan">Increase your server's activity <span className="text-highlight">easily</span> with Discord's favorite <span className="text-highlight">fun</span> bot.</p>					
				</div>
				<div id="home-hero-cta">
					<a id="home-hero-cta-invite" href="https://invite.dankmemer.lol">Invite now</a>
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
    		<section className="reverse">
      			<img height="15rem!important;" alt="Dank Memer is an in depth and unique + funny currency bot along with all our other features" src={CurrencyIMG}/>
      			<div className="text-area">
        			<span className="section-title blurple">CURRENCY FEATURES</span>
        			<p className="section-body">Dank Memer has one of the most unique and fun currency systems of any Discord Bots. With stealing, gambling, bankrobbing, unique/funny items, and so much more, we'll spice up your server</p>
        		</div>
    		</section>
    		<section>
				<img alt="Two of Dank Memer's MANY memey commands - pls meme and pls floor" src={MemesIMG}/>
				<div className="text-area">
        			<span className="section-title blurple">MEME COMMANDS</span>
        			<p className="section-body">Dank Memer has 100+ meme commands, with a lot of them specializing in helping you generate your own memes. Browse our <a href="/commands">commands page</a> for the Memey and Image categories!</p>
        		</div>
    		</section>
    		<div align="center">
				<ins className="adsbygoogle ad" data-adtest="on" data-ad-client="ca-pub-7326182486296195" data-ad-slot="5725651587" />
        	</div>
			<section className="reverse">
				<img height="15rem!important;" alt="Dank Memer is a popular bot, and in many cases raises a server's activity levels by a TON!" src={InsightIMG}/>
				<div className="text-area">
					<span className="section-title blurple">BUILD SERVER ACTIVITY</span>
					<p className="section-body">With over 12 million active users, growing at about 300k new users a month, you will attract people to join and participate in your server just by having our bot. It's very community based, and has lots of ways to interact with other server members.</p>
				</div>
			</section>
			<section>
				<img alt="We have two GIANT community servers for Dank Memer. One is for bot support, the other is for hanging out with other users and giveaways!" src={InvitesIMG}/>
				<div className="text-area">
					<span className="section-title blurple">MASSIVE COMMUNITY SERVERS</span>
					<p className="section-body">We have to GIANT servers for you to join, all about Dank Memer! One is purely for support and announcements, and the other is a community server based around using the bot and participating in giveaways of our currency system!</p>
				</div>
			</section>
    		<div className="call-to-action">
				<span className="action-text">Join the growing Dank Memer family, today.</span>
				<div className="links">
					<Button link="https://invite.dankmemer.lol">Add Bot</Button>
					<Button link="/commands">Commands</Button>
				</div>
    		</div>
    		<div align="center">
				<ins className="adsbygoogle ad" data-adtest="on" data-ad-client="ca-pub-7326182486296195" data-ad-slot="4197264728"/>
        	</div>
  		</div>
	);
}