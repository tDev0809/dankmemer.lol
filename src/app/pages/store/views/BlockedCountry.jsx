import React from 'react';
import { Link } from 'react-router-dom';

export default function BlockedCountry({ country }) {
	return (
		<div id="store-prompt">
			<div id="store-prompt-content">
				<h1 id="store-prompt-content-title">Sorry.</h1>
				<div id="store-prompt-content-body">
					<p className="store-prompt-content-message">Loot boxes are declared illegal in your country. As a result, you are unable to purchase any boxes.</p>
					<p className="store-prompt-content-message">Alternatively, click <a href="https://www.google.com/search?q=flights+to+usa">here</a> to find flights to the Land of Freedom.</p>
					<div style={{ fontSize: '4px' }}>
						<p>also {country} gay lmao</p>
					</div>
				</div>
				<Link to="/" id="store-prompt-content-button">Go home</Link>
			</div>
		</div>
	)
}
