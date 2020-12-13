import React from 'react';
import { Link } from 'react-router-dom';

export default function BannedUser() {
	return (
		<div id="store-prompt">
			<div id="store-prompt-content">
				<h1 id="store-prompt-content-title">Not so fast!</h1>
				<div id="store-prompt-content-body">
					<p className="store-prompt-content-message">Your account has been banned from purchasing any of our lootboxes! If you think this is a mistake, please join <a href="https://discord.gg/meme" target="_blank" rel="noopener noreferrer">our support server</a> for assistance. If this is correct, you may attempt to <Link to="/appeals">appeal your ban</Link>.</p>
				</div>
				<Link to="/" id="store-prompt-content-button">Go home</Link>
			</div>
		</div>
	)
}
