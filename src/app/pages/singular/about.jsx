import React, { useEffect } from 'react';
import 'assets/styles/pages/singular/about.scss';

const adPlacements = [
	'nitropay-about-middle'
]


export default function About() {

	useEffect(() => {
		adPlacements.forEach((placement) => {
			window.nitroAds && window.nitroAds.createAd(placement, {
				"refreshLimit": 10,
				"refreshTime": 90,
				"renderVisibleOnly": false,
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
		<div id="about">
			<h1 id="about-title">About<br/><span className="text-highlight">Dank Memer</span></h1>
			<div className="about-paragraph">
				<h2 className="about-paragraph-title">What is Dank Memer?</h2>
				<p className="about-paragraph-body">
					Dank Memer is a multipurpose yet unique bot, made specifically with "memes" in mind. We do everything that your
					average multipurpose bot does, but much better and with 100% more sass and memes. Dank Memer is a top notch Meme
					bot, currency bot, image manipulation bot, and so much more! We have over 250 commands, and that keeps growing.
					Anything you want or need in your server, we probably handle it!
				</p>
			</div>
			<div className="about-paragraph">
				<h2 className="about-paragraph-title">Why Dank Memer?</h2>
				<p className="about-paragraph-body">
					Heyo, Melmsie here. Dank Memer was my very first programming project, used for me to learn JavaScript in late 2016.
					I realized that there weren't any decent bots doing "memey" things yet. So I made 3 commands <code>!meme</code>,
					<code>!trigger</code>, and cleverbot. I wanted the bot to be sassy and funny from the start, and from that the
					idea of Dank Memer was born. I renamed the bot from Markos to Dank Memer, and created it's current account and
					listed it publically in January of 2017. The rest is history!
				</p>
			</div>
			<div className="about-paragraph">
				<h2 className="about-paragraph-title">Why are there paid perks?</h2>
				<p className="about-paragraph-body">
					For the first year of Dank Memer, there was little to no paid features. We really did (and still do) push ourselves
					to make the most accessible bot we could, and we know not everyone can afford to pay for things. Eventually, our
					server costs grew, and our work hours with it. We had to make the decision to add premium content. For a while we
					broke even with server costs, and our development time was falling due to IRL issues. Once Melmsie decided to work
					on the bot full time as a job, things started picking back up again. Soon after, he was able to raise the bot's
					income and hire 3 more devs. From there, the bot grew into a fully functional business, and Melmsie now employs
					3 people to help with it all!
				</p>
				<p className="about-paragraph-body-mt">
					Now while we will always have premium perks, the base features and a vast majority of our commands will always be
					free. And to those who financially supported us, thank you. Dank Memer wouldn't be alive without you.
				</p>
			</div>
			<div id="nitropay-about-middle" className="nitropay ad-h"/>
			<div id="about-usage">
				<h1 id="about-usage-title">Basic Usage</h1>
				<div className="about-paragraph">
					<h2 className="about-paragraph-title">Adding Dank Memer</h2>
					<p className="about-paragraph-body">
						Dank Memer is able to be added to any server by someone with <code>Manage Server</code> permissions on said server.<br/>
						For most commands, all you need for bot permissions are <code>Send Messages, Read Messages, and Embed Links</code>.
					</p>
				</div>	
				<div className="about-paragraph">
					<h4 className="about-paragraph-subtitle">Invites for Dank Memer</h4>
					<p className="about-paragraph-body">
						You can invite Dank Memer using the <a href="https://invite.dankmemer.lol" rel="noopener noreferrer">primary invite</a>.
						While also available for your server is our <a href="https://beta.dankmemer.lol">beta bot</a>. This is an "early access"
						version of Dank Memer. It's not always online or stable, but it usually has sneak peeks at future updates.
					</p>
				</div>
				<div className="about-paragraph">
					<h2 className="about-paragraph-title">Bot Prefix</h2>
					<p className="about-paragraph-body">
						By default, Dank Memer's prefix is <code>pls</code>. Commands are run like <code>pls meme</code>, there must be a space!
					</p>
					<p className="about-paragraph-body-mt">
						You are able to change the prefix with <code>pls prefix (prefix of your choice)</code>. Right now you have to keep
						the space, but this may change in the future.
					</p>
					<p className="about-paragraph-body-mt">
						Prefixes are customizable per server, and if you forget the
						server's custom prefix you can run <code>@Dank Memer hello</code> and the bot will return the current prefix to you.
					</p>
				</div>
			</div>		
        </div>
	)
}