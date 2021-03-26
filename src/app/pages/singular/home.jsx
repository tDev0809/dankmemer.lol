import React, { useEffect } from 'react';
import MemesIMG from 'assets/img/memes.png';
import InsightIMG from 'assets/img/insights.png';
import InvitesIMG from 'assets/img/invites.png';
import CurrencyIMG from 'assets/img/currency.png';
import 'assets/styles/pages/singular/home.scss';
import BottomCTA from '../../components/bottomCTA';
import createAd from '../../util/createAd';

export default function Home () {

	useEffect(() => {
		window.scroll(0,0)

		createAd('nitropay-home-top', {
			sizes: [
				[320, 50],
				[300, 50],
				[300, 250]
			],
			renderVisibleOnly: true
		}, 'mobile');

		createAd('nitropay-home-middle', {
			sizes: [ [728, 90] ],
			renderVisibleOnly: true
		}, 'desktop');
		createAd('nitropay-home-middle', {
			sizes: [
				[320, 50],
				[300, 50],
				[300, 250]
			],
			renderVisibleOnly: true
		}, 'mobile');
	
		createAd('nitropay-home-bottom', {
			sizes: [
				[728, 90],
				[970, 90],
			],
			renderVisibleOnly: true
		}, 'desktop');
		createAd('nitropay-home-bottom', {
			sizes: [
				[320, 50],
				[300, 50],
				[300, 250]
			],
			renderVisibleOnly: true
		}, 'mobile');	

	}, []);

	const perspective = (e) => {
		let x = (e.pageX * -1 / 100);
		let y = (e.pageY * -1 / 100);
		document.getElementById("home-hero-svg").style.transform = `translate(${x}px, ${y}px)`
	}

	return (
		<div id="home">
    		<div id="home-hero" onMouseMove={(e) => perspective(e)}>
				<div id="home-hero-text">
					<h1 id="home-hero-text-title">Dank Memer</h1>
					<p id="home-hero-text-slogan">Join millions of users around the world in Discord's largest fun economic bot.</p>					
				</div>
				<div id="home-hero-cta">
					<a id="home-hero-cta-invite" href="https://invite.dankmemer.lol" rel="noreferrer noopener">Invite now</a>
					<span id="home-hero-cta-bg"></span>
				</div>
				<div id="home-hero-svg">
					<svg height="500" width="1100">
						<g transform="scale(1.4) translate(150,150) rotate(185)"> {/* Top left triangle */}
							<polygon fill="#0b110c" stroke="#14763d" strokeWidth="1.5px" className="triangle" points="62.5,15 12.5,100 112.5,100"  />
						</g>
						<g transform="scale(.7) translate(340,400) rotate(140)"> {/* Bottom left triangle */}
							<polygon fill="#0b110c" stroke="#14763d" strokeWidth="4px" className="triangle" points="62.5,15 12.5,100 112.5,100"  />
						</g>
						<g transform="scale(.6) translate(1200,30) rotate(85)"> {/* Top right triangle */}
							<polygon fill="#0b110c" stroke="#14763d" strokeWidth="3px" className="triangle" points="62.5,15 12.5,100 112.5,100"  />
						</g>
						<g transform="scale(1) translate(900,200) rotate(20)"> {/* Bottom right triangle */}
							<polygon fill="#0b110c" stroke="#14763d" strokeWidth="3px" className="triangle" points="62.5,15 12.5,100 112.5,100"  />
						</g>
					</svg>
				</div>
				<div id="nitropay-home-top" className="nitropay" />
    		</div>
			<div id="home-quickinfo">
				<div id="qi-details">
					<h2 id="qi-title">What is it all about?</h2>
					<p id="qi-about">Here are a just a few of the things that makes Dank Memer great.</p>
				</div>
				<div id="home-quickinfo-content">
					<div className="col-2">
						<div className="qi-group" id="qi-currency">
							<div className="qi-icon">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="bevel"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
							</div>
							<div id="qi-currency-content">
								<h4>Money, Money, Money</h4>
								<p>Experience one of the most unique economies found in any Discord bot.</p>
							</div>
						</div>
						<div className="qi-group" id="qi-fun">
							<div className="qi-icon">
								<span className="material-icons-outlined">emoji_emotions</span>
							</div>
							<div id="qi-fun-content">
								<h4>Even Some Funny Jokes</h4>
								<p>100+ meme-related commands, you can have a good laugh without the need of scrolling through Reddit.</p>
							</div>
						</div>
					</div>
					<div className="col-2">
						<div className="qi-group" id="qi-players">
							<div className="qi-icon">
								<span className="material-icons">groups</span>
							</div>
							<div id="qi-currency-content">
								<h4>More Than I Can Count</h4>
								<p>Even if you don't have friends, there are millions of other users waiting to rob you!</p>
							</div>
						</div>
						<div className="qi-group" id="qi-settings">
							<div className="qi-icon">
								<span className="material-icons">settings</span>
							</div>
							<div id="qi-currency-content">
								<h4>Just Right, For You</h4>
								<p>You are able to change specific elements of the bot off or on, personally or for your server.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
    		{/* <section style={{ background: 'red' }}>
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
    		</section> */}
			{/* <div id="nitropay-home-middle" className="nitropay" /> */}
			{/* <section>
				<div className="text-area">
					<h3 className="section-title"><span className="text-highlight">Generate</span> Server<br/> Growth</h3>
					<p className="section-body">With over 12 million active users, growing at about 300k new users a month, you will attract people to join and participate in your server just by having our bot. It's very community based, and has lots of ways to interact with other server members.</p>
				</div>
				<img height="15rem!important;" alt="Dank Memer is a popular bot, and in many cases raises a server's activity levels by a TON!" src={InsightIMG}/>
			</section>
			<section className="reverse">
				<div className="text-area">
					<h3 className="section-title"><span className="text-highlight">Massive</span> Community<br/> Servers</h3>
					<p className="section-body">We have two GIANT servers for you to join, all about Dank Memer! One is purely for support and announcements, and the other is a community server based around using the bot and participating in giveaways of our currency system!</p>
				</div>
				<img id="homepage-snowflake-image" alt="We have two GIANT community servers for Dank Memer. One is for bot support, the other is for hanging out with other users and giveaways!" src={InvitesIMG}/>
			</section> */}
			<div id="nitropay-home-bottom" className="nitropay"/>
			<BottomCTA/>
			<span data-ccpa-link="1"></span>
  		</div>
	);
}