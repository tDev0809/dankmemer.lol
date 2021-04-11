import React, { useEffect, useState } from 'react';
import 'assets/styles/pages/singular/home.scss';
import BottomCTA from '../../components/bottomCTA';
import createAd from '../../util/createAd';

export default function Home () {

	const [mobile, setMobile] = useState(false);

	const handleResize = () => {
		if(document.documentElement.clientWidth < 900) setMobile(true);
		else if(document.documentElement.clientWidth > 900) setMobile(false);
	}

	useEffect(() => {
		window.scroll(0,0);
		handleResize();

		window.addEventListener("resize", () => {
			handleResize();
		});

		createAd('nitropay-home-top', {
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
				{!mobile ?
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
				:
					<div id="home-info-cards">
						<div className="home-card">
							<div className="home-card-icon">
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="bevel"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
							</div>
							<div className="home-card-content">
								<h4>Money, Money, Money</h4>
								<p>Experience one of the most unique economies found in any Discord bot.</p>
							</div>
						</div>
						<div className="home-card">
							<div className="home-card-icon">
								<span className="material-icons-outlined">emoji_emotions</span>
							</div>
							<div className="home-card-content">
								<h4>Even Some Funny Jokes</h4>
								<p>100+ meme-related commands, you can have a good laugh without the need of scrolling through Reddit.</p>
							</div>
						</div>
						<div className="home-card">
							<div className="home-card-icon">
								<span className="material-icons">groups</span>
							</div>
							<div className="home-card-content">
								<h4>More Than I Can Count</h4>
								<p>Even if you don't have friends, there are millions of other users waiting to rob you!</p>
							</div>
						</div>
						<div className="home-card">
							<div className="home-card-icon">
								<span className="material-icons">settings</span>
							</div>
							<div className="home-card-content">
								<h4>Just Right, For You</h4>
								<p>You are able to change specific elements of the bot off or on, personally or for your server.</p>
							</div>
						</div>
					</div>
				}
			</div>
			<div id="nitropay-home-bottom" className="nitropay"/>
			<BottomCTA/>
			<span data-ccpa-link="1"></span>
  		</div>
	);
}