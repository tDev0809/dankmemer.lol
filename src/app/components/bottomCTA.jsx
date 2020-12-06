import React from 'react';
import { Link } from 'react-router-dom';

export default function BottomCTA () {
    return (
        <div id="bottom-cta">
            <h1 id="bottom-cta-title">What are you waiting for?</h1>
            <p id="bottom-cta-subtitle">Join the growing Dank Memer family today!</p>
            <a id="bottom-cta-button" href="https://invite.dankmemer.lol" rel="noreferrer noopener">Invite Now</a>
            <p id="bottom-cta-text">Not convinced? Check out all the <Link to="/commands" className="text-highlight">commands</Link> available!</p>
        </div>
    )
}