import React from 'react';
import { Link } from 'react-router-dom'
import 'assets/styles/pages/singular/notfound.scss';

export default function NotFound() {

	return (
		<div id="notfound">
			<div id="notfound-text">
				<h1 id="notfound-text-title">Uh oh!</h1>
				<p id="notfound-text-message">We can't seem to find the page that you were looking for.</p>
				<Link id="notfound-text-button" to="/">Go home</Link>
			</div>
		</div>
	)
}