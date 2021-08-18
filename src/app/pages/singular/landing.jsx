import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import 'assets/styles/pages/singular/landing.scss';
import createAd from '../../util/createAd';

export default function Landing() {
	const history = useHistory();

	useEffect(() => {
		window.scroll(0,0);
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
			<div id="nitropay-landing-top" className="nitropay" />
			<h3 id="landing-title-upper">Thanks for adding</h3>
			<h1 id="landing-title">Dank Memer</h1>
			<p id="landing-info">To help you get started using our bot you can take a look around this website where most aspects of the bot are documented.</p>
			<div id="landing-cards">
				<div className="landing-card">
					<div className="landing-card-icon" onClick={() => history.push('/commands')}>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="7.5" y1="16.5" x2="16.5" y2="7.5" /></svg>
					</div>
					<div className="landing-card-text">
						<h4 className="landing-card-name">Commands</h4>
						<p className="landing-card-text">See all of the commands Dank Memer has to offer your server!</p>
					</div>
				</div>
				<div className="landing-card">
					<div className="landing-card-icon" onClick={() => window.location.href = "https://discord.gg/meme"}>
						<span class="material-icons-outlined">support_agent</span>
					</div>
					<div className="landing-card-text">
						<h4 className="landing-card-name">Support</h4>
						<p className="landing-card-text">FAQ page not enough to help? Head over to our support server!</p>
					</div>
				</div>
				<div className="landing-card">
					<div className="landing-card-icon" onClick={() => history.push('/faq')}>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="10" cy="10" r="7" /><path d="M21 21l-6 -6" /><line x1="10" y1="13" x2="10" y2="13.01" /><path d="M10 10a1.5 1.5 0 1 0 -1.14 -2.474" /></svg>					
					</div>
					<div className="landing-card-text">
						<h4 className="landing-card-name">FAQ</h4>
						<p className="landing-card-text">Have some questions? See if we've already answered it on this page!</p>
					</div>
				</div>
				<div className="landing-card">
					<div className="landing-card-icon" onClick={() => history.push('/items')}>
						<span class="material-icons-outlined">category</span>
					</div>
					<div className="landing-card-text">
						<h4 className="landing-card-name">Items</h4>
						<p className="landing-card-text">See all of the commands Dank Memer has to offer your server!</p>
					</div>
				</div>
				<div className="landing-card">
					<div className="landing-card-icon" onClick={() => window.location.href = "https://www.patreon.com/join/dankmemerbot"}>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 3h3v18h-3z" /><circle cx="15" cy="9.5" r="6.5" /></svg>
					</div>
					<div className="landing-card-text">
						<h4 className="landing-card-name">Premium</h4>
						<p className="landing-card-text">Click here to head to Patreon to see our premium perk selections!</p>
					</div>
				</div>
				<div className="landing-card">
					<div className="landing-card-icon" onClick={() => history.push("/loot")}>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><polyline points="12 3 20 7.5 20 16.5 12 21 4 16.5 4 7.5 12 3" /><line x1="12" y1="12" x2="20" y2="7.5" /><line x1="12" y1="12" x2="12" y2="21" /><line x1="12" y1="12" x2="4" y2="7.5" /><line x1="16" y1="5.25" x2="8" y2="9.75" /></svg>
					</div>
					<div className="landing-card-text">
						<h4 className="landing-card-name">Loot boxes</h4>
						<p className="landing-card-text">Dank Memer? More like EA: Memer edtion, come check out our "surprise mechanics"!</p>
					</div>
				</div>
				<div className="landing-card">
					<div className="landing-card-icon" onClick={() => window.location.href = "https://twitter.com/dankmemerbot"}>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z" /></svg>
					</div>
					<div className="landing-card-text">
						<h4 className="landing-card-name">Twitter</h4>
						<p className="landing-card-text">Follow us on Twitter! We love interacting with you all and shitposting :^&#41;</p>
					</div>
				</div>
				<div className="landing-card">
					<div className="landing-card-icon" onClick={() => window.location.href = "https://www.reddit.com/r/dankmemer/"}>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 8c2.648 0 5.028 .826 6.675 2.14a2.5 2.5 0 0 1 2.326 4.36c0 3.59 -4.03 6.5 -9 6.5c-4.875 0 -8.845 -2.8 -9 -6.294l-1 -.206a2.5 2.5 0 0 1 2.326 -4.36c1.646 -1.313 4.026 -2.14 6.674 -2.14z" /><path d="M12 8l1 -5l6 1" /><circle cx="19" cy="4" r="1" /><circle cx="9" cy="13" r=".5" fill="currentColor" /><circle cx="15" cy="13" r=".5" fill="currentColor" /><path d="M10 17c.667 .333 1.333 .5 2 .5s1.333 -.167 2 -.5" /></svg>
					</div>
					<div className="landing-card-text">
						<h4 className="landing-card-name">Reddit</h4>
						<p className="landing-card-text">Check out, and take part in, our official subreddit!</p>
					</div>
				</div>
				<div className="landing-card">
					<div className="landing-card-icon" onClick={() => window.location.href = "https://www.youtube.com/c/DankMemerDiscordBot"}>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><circle cx="9" cy="7" r="4" /><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M21 21v-2a4 4 0 0 0 -3 -3.85" /></svg>
					</div>
					<div className="landing-card-text">
						<h4 className="landing-card-name">Community</h4>
						<p className="landing-card-text">Join and meet other users in our public server. <span className="hideToHover"><b>Just please don't ping the devs</b>!</span></p>
					</div>
				</div>
			</div>
			<div id="nitropay-landing-bottom" className="nitropay" />
		</div>
	)
}