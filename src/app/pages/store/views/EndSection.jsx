import React from 'react';
import { Link } from 'react-router-dom';

export default function PaymentSuccess(props) {
	return (
		<div id="store-prompt">
			<div id="store-prompt-content">
				<h1 id="store-prompt-content-title">{props.success ? 'Success!' : 'Uh oh..'}</h1>
        		{props.success ?
					<div id="store-prompt-content-body">
						<p className="store-prompt-content-message" style={{ marginBottom: '15px' }}>Your payment has successfully been made. Your boxes should be deposited directly into your inventory within 5 minutes of completing the purchase.</p>
						<p className="store-prompt-content-message">If they do not show up after 24 hours, join <a href="https://discord.gg/meme" target="_blank" rel="noopener noreferrer">the support server</a> and mention a mod or a developer for assistance.</p>
						<p className="store-prompt-content-message">Additionally, can find your Payment ID below.<br />You should store this ID somewhere and make sure you don't lose it - it is necessary if you are experiencing any problems.
						<br/>Payment ID: <span className="text-highlight">{props.data && props.data.id}</span></p>
					</div>
        		:	
				<div id="store-prompt-content-body">
					<p className="store-prompt-content-message" style={{ marginBottom: '15px' }}>uwu we make a fucky wucky!! A wittle fucko boingo! The code monkeys at our headquaters are working VEWY HAWD to fix this!</p>					
					<p className="store-prompt-content-message">Something went wrong while trying to {props.data && props.data ? 'process' : 'create'} your payment. You can try again or join <a href="https://discord.gg/meme" target="_blank" rel="noopener noreferrer">the support server</a> for help{props.data ? ' and contact an administrator with your Payment ID:' : '.'}</p>
				</div>
        		}
				<Link to="/loot" id="store-prompt-content-button">Go to store</Link>
			</div>
		</div>
	)
}
