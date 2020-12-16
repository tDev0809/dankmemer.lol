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
						Usage of user-bots, macros, scripts or anything else enabling automation of commands is strictly forbidden.
						In addition to this, massive amounts of spam is not allowed and will be punished with equal severity.
					</p>
				</div>
				<div className="rules-container-item">
					<h3 className="rules-container-item-title">Rule Two</h3>
					<p className="rules-container-item-subtitle">Sharing Exploits</p>
					<p className="rules-container-item-body">
						Sharing exploits and or bugs with other users is forbidden. Please report all exploits and bugs to staff on
						the <a href="https://discord.gg/meme" target="_blank" rel="noopener noreferrer">Dank Memer Support Server</a> so
						that we can fix it as soon as possible.
					</p>
				</div>
				<div className="rules-container-item">
					<h3 className="rules-container-item-title">Rule Three</h3>
					<p className="rules-container-item-subtitle">Coin Storage Accounts or Farming Accounts</p>
					<p className="rules-container-item-body">
						Usage of alternate accounts ("alts") to form or store coins is forbidden. This also includes giving coins to real
						people who don't use the currency system.
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
						Usage of Dank Memer to advertise or promote anything will result in a punishment. This includes other Discord servers.
					</p>
				</div>
				<div className="rules-container-item">
					<h3 className="rules-container-item-title">Rule Six</h3>
					<p className="rules-container-item-subtitle">Scams, Sales and Trading</p>
					<p className="rules-container-item-body">
						Dank Memer's currency, along with any other feature of the bot, used with intent to scam, trade or sell anything is
						forbidden. For example; Giving meme coins in exchange for a user to advertise your Discord server.
					</p>
				</div>
				<div className="rules-container-item">
					<h3 className="rules-container-item-title">Rule Seven</h3>
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