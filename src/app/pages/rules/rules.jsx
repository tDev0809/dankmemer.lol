import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'assets/styles/pages/rules/rules.scss';

export default function Rules() {

	useEffect(() => {
		window.scrollTo(0,0);
	}, []);

	return (
		<div id="rules">
			<h1 id="rules-title">Dank Memer Rules</h1>
			<p id="rules-warning">
				By using Dank Memer, you agree to the following rules. If you break any
				rules we reserve the right to remove your access to any and all Dank Memer services.
			</p>
			<div id="rules-container">
				<div className="rules-container-item">
					<h3 className="rules-container-item-title">Rule One</h3>
					<p className="rules-container-item-subtitle">User-bots, Spamming and Macros</p>
					<p className="rules-container-item-body">
					Usage of user-bots, macros, scripts, auto-typers or anything else enabling automation of commands is strictly forbidden. In addition to this, massive amounts of spam is not allowed and will be punished with equal severity.
					</p>
				</div>
				<div className="rules-container-item">
					<h3 className="rules-container-item-title">Rule Two</h3>
					<p className="rules-container-item-subtitle">Sharing Exploits</p>
					<p className="rules-container-item-body">
						Sharing exploits or exploitative bugs with other users is forbidden. Please report all exploits and bugs to staff on
						the <a href="https://discord.gg/meme" target="_blank" rel="noopener noreferrer">Dank Memer Support Server</a> so
						that we can fix it as soon as possible.
					</p>
				</div>
				<div className="rules-container-item">
					<h3 className="rules-container-item-title">Rule Three</h3>
					<p className="rules-container-item-subtitle">Giveaway Requirements or Bot Usage Requirements in Your Server</p>
					<p className="rules-container-item-body">
						You should not lock the bot, or giveaways for the bot, behind paywalls. This means stuff like patreon roles, donor roles (with irl money), etc, is forbidden for giveaway requirements or role locks. The only exception to this is boosters, we will allow you to lock things behind being a booster for your server. Things like level locks using external bots is perfectly fine.
					</p>
				</div>
				<div className="rules-container-item">
					<h3 className="rules-container-item-title">Rule Four</h3>
					<p className="rules-container-item-subtitle">Racism, Homophobia, Sexism or Slurs</p>
					<p className="rules-container-item-body">
						None of the above will be tolerated through usage of Dank Memer. We will not punish you for what you say outside of
						the usage of our commands. Evidence found of this done through our commands will result in punishment.
					</p>
				</div>
				<div className="rules-container-item">
					<h3 className="rules-container-item-title">Rule Five</h3>
					<p className="rules-container-item-subtitle">Advertisement</p>
					<p className="rules-container-item-body">
						Usage of Dank Memer to advertise or promote anything will result in a punishment. This includes other Discord servers. Giving our currency in exchange for invites to your server is also forbidden.
					</p>
				</div>
				<div className="rules-container-item">
					<h3 className="rules-container-item-title">Rule Six</h3>
					<p className="rules-container-item-subtitle">Real Money Trading</p>
					<p className="rules-container-item-body">
					Dank Memer's currency is not to be traded for real money, discord nitro, or to other bot currency. Buying anything with real money outside of our patreon and website, will get you a ban.
					</p>
				</div>
				<div className="rules-container-item">
					<h3 className="rules-container-item-title">Rule Seven</h3>
					<p className="rules-container-item-subtitle">Etiquette</p>
					<p className="rules-container-item-body">
						Starting harmful rumors about the bot, causing unnecessary drama within our servers about the bot, or witch hunting staff members are all ban worthy behaviors.
					</p>
				</div>
				<div className="rules-container-item">
					<h3 className="rules-container-item-title">Rule Eight</h3>
					<p className="rules-container-item-subtitle">Discord Terms of Service and Usage Guidelines</p>
					<p className="rules-container-item-body">
						Through usage of Dank Memer, you accept <Link to="/terms">Dank Memer's Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>. Additionally, you accept Discord's <a href="https://discord.com/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a> and <a href="https://discord.com/guidelines" target="_blank" rel="noopener noreferrer">Community Guidelines</a>,
						these of which are enforceable through Dank Memer.
					</p>
				</div>
			</div>
		</div>
	);
}