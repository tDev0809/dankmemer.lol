import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as axios from 'axios';
import { connect } from 'react-redux';

import DiscordLogin from '../../components/discordLogin';
import PaypalButton from '../../components/paypalButton';

import BannedUser from './views/BannedUser.jsx';
import EndSection from './views/EndSection.jsx';
import BlockedCountry from './views/BlockedCountry.jsx';
import AgeRequired from './views/AgeRequired.jsx'
import ree from '../../util/ree.js';
import images from './util/images.js';
import parseTime from '../../util/parseTime.js';

import 'assets/styles/pages/store/lootboxes.scss';

const greetings = ['Go on, honey. Go pick yourself a boxy box.', 'TREAT YO SELF... to a box of loot.', 'Cmon, you know you want a box.', 'Look at all these chickens (boxes).', 'A box a day keeps the loot goblins away...']
const box = {
	id: 0,
	name: 'Lootbox',
	description: "Lootbox description",
	items: [],
	price: 0,
	randomItem: {
		chance: 0,
		keyword: 'N/A'
	},
	yield: "0 - 0"
}

function Loot(props) {
	const boxValue = useRef();
	const [boxes, setBoxes] = useState([box]);
	const [activeBox, setActiveBox] = useState(box);
	const [country, setCountry] = useState("");
	const [bannedUser, setBannedUser] = useState(false);
	const [agreedTOS, setAgreedTOS] = useState(false);
	const [finishedPayment, setFinishedPayment] = useState(false);
	const [paymentData, setPaymentData] = useState(null);
	const [boxCount, setBoxCount] = useState(1);
	const [isGift, setIsGift] = useState(null);
	const [giftRecipient, setGiftRecipient] = useState(0);
	const [checkAge, setCheckAge] = useState(false);

	const [validGift, setValidGift] = useState(false);

	const [isRee, setIsRee] = useState(false);
	const [currentPeepo, setCurrentPeepo] = useState(0);
	const [showPeepos, setShowPeepos] = useState(false);

	const [discountCountdown, setDiscountCountdown] = useState("");

	const [constants, setConstants] = useState({
		"MINIMUM_PURCHASE_VALUE": 3,
		"MINIMUM_DISCOUNT_VALUE": 20,
		"FLAT_DISCOUNT_PERCENTAGE": 10
	})

	useEffect(() => {
		window.scroll(0,0)
		axios.all([
			axios('/api/boxes'),
			axios('/api/country'),
			axios('/api/isBanned')
		]).then(axios.spread(async ({ data: {boxes, Constants} }, { data: { country }}, req3) => {
			setBoxes(boxes);
			setActiveBox(boxes[1])
			setCountry(country);
			setBannedUser(req3.status === 403);
		})).catch(e => {
			console.error(e);
		});
	}, []);

	useEffect(() => {
		if([ "ES", "BE", "NL" ].includes(country) && !localStorage.getItem("verified_age")) {
			if(localStorage.getItem("verified_age") !== "verified") {
				setCheckAge(true);
				localStorage.setItem("verified_age", "unverified")
			}
		}
	}, [country]);

	useEffect(() => {
		if(isGift && (giftRecipient.toString().length > 16 && giftRecipient.toString().length < 21)) return setValidGift(true);
		else return setValidGift(false);
	}, [giftRecipient]);

	useEffect(() => {
		setBoxCount(1);
	}, [activeBox]);

	useEffect(() => {
		if(!boxValue.current) return;
		boxValue.current.value = boxCount;
	}, [boxCount]);

	useEffect(() => {
		if(isRee) {
			ree({
				duration: 1500,
				intensity: 35
			});
			setTimeout(() => {
				setIsRee(false);
			}, 2000);
		}
	}, [isRee]);

	useEffect(() => {
		if(!props.discount) return;
		let difference = props.discount.expiry - Date.now();
		let expiry = parseTime(props.discount.expiry - Date.now());
		setDiscountCountdown(`${expiry.hours.toString().length === 1 ? '0' + expiry.hours : expiry.hours}:${expiry.minutes.toString().length === 1 ? '0' + expiry.minutes : expiry.minutes}:${expiry.seconds.toString().length === 1 ? '0' + expiry.seconds : expiry.seconds}`)
		setInterval(() => {
			difference = difference - 1000
			expiry = parseTime(difference);
			setDiscountCountdown(`${expiry.hours.toString().length === 1 ? '0' + expiry.hours : expiry.hours}:${expiry.minutes.toString().length === 1 ? '0' + expiry.minutes : expiry.minutes}:${expiry.seconds.toString().length === 1 ? '0' + expiry.seconds : expiry.seconds}`)
		}, 1000);
	}, [props.discount]);

	const verifiedAge = () => {
		localStorage.setItem("verified_age", "verified");
		setCheckAge(false);
	}

	const peepos = Array(13).fill(0).map((_, i) => new Audio(`/static/audio/peepo${i}.mp3`));
	const getPeepoPositioning = () => {
		const direction = Math.floor(Math.random() * 360);

		return {
			'--direction': `${direction}deg`,
			'--delta-x': `${200*Math.sin(direction)}px`,
			'--delta-y': `${150*Math.cos(direction)}px`,
			'--offset-x': direction % 180 ? 0 : `${130 - (Math.random() * 260)}px`,
			'--offset-y': direction % 180 ? `${40 - (Math.random() * 80)}px` : 0
		}
	}

	const finishState = ({ finish }) => {
		setFinishedPayment(finish.success);
		setPaymentData(finish.data);
	}

    const getSubtotal = (returnRaw) => {
        const raw = boxCount * activeBox.price;
        return returnRaw ? raw : raw.toFixed(2);
    }

    const getDiscountPercent = () => {
        const res = {};
        const subtotal = getSubtotal(true);
        let discountPercent = props.discount && props.discount.percent * 100;
        const hypothetical = (subtotal * ((100 - (discountPercent + constants.FLAT_DISCOUNT_PERCENTAGE)) / 100));
        if (hypothetical >= constants.MINIMUM_DISCOUNT_VALUE) {
            discountPercent += constants.FLAT_DISCOUNT_PERCENTAGE;
            res.flat = true;
        } else {
            res.neededUntilFlat = constants.MINIMUM_DISCOUNT_VALUE - hypothetical;
        }

        res.discountPercent = discountPercent;
        return res;
	}

    const getDiscount = (returnRaw) => {
        const subtotal = getSubtotal(true);
        const discountPercent = getDiscountPercent();
        const raw = activeBox.id !== 0 ? subtotal * (discountPercent.discountPercent / 100) : 0;
        return returnRaw ? raw : raw.toFixed(2);
    }

    const getDiscountedSubtotal = (returnRaw) => {
        const raw = getSubtotal(true) - Number(getDiscount());
        return returnRaw ? raw : raw.toFixed(2);
	}
	
	const changeBoxCount = (increase) => {
		if(increase && parseInt(boxCount) < 100) setBoxCount(parseInt(boxCount) + 1)
		else if(!increase && parseInt(boxCount) > 1) setBoxCount(parseInt(boxCount) - 1);
	}

	const updateBoxCount = () => {
		if(!boxValue.current) return;
		if(boxValue.current.value < 1) {
			boxValue.current.value = 1;
			setBoxCount(1);
			setIsRee(true);
		} else if(boxValue.current.value > 100) {
			boxValue.current.value = 100;
			setBoxCount(100);
			setIsRee(true);
		} else setBoxCount(boxValue.current.value)
	}

	return (
		<div id="store">
			{bannedUser ? <BannedUser />
			: country === "BE" ? <BlockedCountry />
			: checkAge ? <AgeRequired checkAge={verifiedAge} />
			: finishedPayment ? <EndSection success={finishedPayment} data={paymentData} /> 
			: <>
				<div id="store-header">
					<h1 id="store-header-title">Dank Memer Store</h1>
					<p id="store-header-message">Welcome to the lootbox shop! Here you can find a variety of different purchasable items that grant you a chance of winning something special!</p>
				</div>
				{props.discount ? 
					<div id="store-discount">
						<div id="store-discount-content">
							<h1 id="store-discount-content-title">Flash Sale!</h1>
							<h3>Sale ends in: {discountCountdown}</h3>
							<p id="store-discount-content-message">Pick up your boxes with a <b>{props.discount.percent * 100}% discount</b> during this limited time event!</p>
						</div>
						<svg id="store-discount-svg" height="100%" width="100%">
							<circle cx="523" cy="39" r="100.5" />
							<circle cx="931.5" cy="38.5" r="50.5" />
							<circle cx="381.5" cy="-0.5" r="26.5" />
							<circle cx="662.7" cy="116.8" r="39.3" />
							<circle cx="1014" cy="11" r="16" />
							<circle cx="720.5" cy="0.5" r="26.5" />
							<circle cx="1221" cy="85" r="46" />
							<circle cx="247" cy="98" r="13" />
							<circle cx="147" cy="8" r="50" />
						</svg>
					</div>
				: ''}
				<div id="store-boxes">
					{boxes.map((box, i) => (
						<div key={i} className={activeBox.id === i ? "store-box active" : "store-box"} onClick={() => {
							if(activeBox.id !== i) {
								if(currentPeepo < 1) setCurrentPeepo(0);
								else if(currentPeepo >= 12) setCurrentPeepo(0);
								peepos[currentPeepo].play();
								setCurrentPeepo(currentPeepo + 1);
								setShowPeepos(true);
							}
							setActiveBox(boxes[i]);
						}}>
							<h2 className="store-box-name">{box.name}</h2>
							<p className="store-box-price">${box.price}</p>
							{showPeepos && activeBox.id === i ?
							<div id="peepos">
								<div className="peepo" style={{ ...getPeepoPositioning(), backgroundImage: `url(${images[Math.floor(Math.random() * images.length)]})`}} />
								<div className="peepo" style={{ ...getPeepoPositioning(), backgroundImage: `url(${images[Math.floor(Math.random() * images.length)]})`}} />
								<div className="peepo" style={{ ...getPeepoPositioning(), backgroundImage: `url(${images[Math.floor(Math.random() * images.length)]})`}} />
								<div className="peepo" style={{ ...getPeepoPositioning(), backgroundImage: `url(${images[Math.floor(Math.random() * images.length)]})`}} />
								<div className="peepo" style={{ ...getPeepoPositioning(), backgroundImage: `url(${images[Math.floor(Math.random() * images.length)]})`}} />
							</div>
							: ''}
							{activeBox.id === i ?
							<div id="store-box-counter">
								<div id="store-box-counter-sub" onClick={() => changeBoxCount(false)}>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
										<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
										<line x1="5" y1="12" x2="19" y2="12" />
									</svg>
								</div>
								<input id="store-box-counter-num" type="number" ref={boxValue} defaultValue={1} onInput={() => updateBoxCount()} placeholder="Boxes" />
								<div id="store-box-counter-add" onClick={() => changeBoxCount(true)}>
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
										<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
										<line x1="12" y1="5" x2="12" y2="19" />
										<line x1="5" y1="12" x2="19" y2="12" />
									</svg>
								</div>
							</div> : ''}
						</div>
					))}
				</div>
				<div id="store-details">
					<div id="store-items">
						<h2 id="store-items-title">Possible items</h2>
						<p id="store-items-message">Below includes a list of all the goodies and the maximum amount of items you could receive from the purchase of a <span className="text-highlight">{activeBox.name}</span>! Along with these items, you have the chance of getting anywhere in the range of <span className="text-highlight">⏣ {activeBox.yield}</span>.</p>
						<table>
							<thead>
								<tr>
									<th>Item name</th>
									<th>Max. Amount</th>
								</tr>
							</thead>
							<tbody>
								{activeBox.items.map(({ name, amount }, i) => (
									<tr key={i}>
										<td>{name}</td>
										<td>{amount}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<div id="store-summary">
						<h2 id="store-summary-title">Order summary</h2>
						<p id="store-summary-message">All orders are processed via PayPal and will operate using the United States Dollar. Each order has a minimum charge amount of ${constants.MINIMUM_PURCHASE_VALUE} where you will need to fulfill this amount to continue. Orders over ${constants.MINIMUM_DISCOUNT_VALUE} will receive a {constants.FLAT_DISCOUNT_PERCENTAGE}% discount.</p>
						<table id="store-summary-items">
							<tbody>
								<tr>
									<td>{boxCount}x {activeBox.name}</td>
									<td>${Math.round(((boxCount * activeBox.price) + Number.EPSILON) * 100) / 100}</td>
								</tr>
								<tr>
									<td>Added sales tax</td>
									<td>${constants ? (getDiscountedSubtotal(true) * 0.0675).toFixed(2) : ''}</td>
								</tr>
								<tr>
									<td>Discount</td>
									<td>{getDiscountPercent().discountPercent || 0}% (${getDiscount()})</td>
								</tr>
								<tr><td/><td/></tr>
								<tr>
									<td></td>
									<td id="store-summary-total">Total: ${(Math.round(((boxCount * activeBox.price) + Number.EPSILON) * 100) / 100) < 20 ? 
									Math.round((parseFloat(constants ? (getDiscountedSubtotal(true) * 0.0675).toFixed(2) : 0) + parseFloat(boxCount * activeBox.price) + Number.EPSILON) * 100) / 100 :
									((Math.round((parseFloat(constants ? (getDiscountedSubtotal(true) * 0.0675).toFixed(2) : 0) + parseFloat(boxCount * activeBox.price) + Number.EPSILON) * 100) / 100) - ((boxCount * activeBox.price) * (getDiscountPercent().discountPercent / 100)).toFixed(2)).toFixed(2)}</td>
								</tr>
							</tbody>
						</table>
						<div id="store-summary-inputs">
							<div className="store-summary-input">
								<input name="tos-privacy" type="checkbox" onChange={(e) => setAgreedTOS(e.target.checked)}/>
								<div className="store-summary-input-tick">
									<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
										<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
										<path d="M5 12l5 5l10 -10" />
									</svg>
								</div>
								<label htmlFor="tos-privacy">I agree to Dank Memer’s <Link to="/terms">Terms of Service</Link> and <Link to="refunds">Refund Policy</Link>.</label><br/>
							</div>
							<div className="store-summary-input">
								<input name="gift-purchase" type="checkbox" onChange={(e) => setIsGift(e.target.checked)}/>
								<div className="store-summary-input-tick">
									<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
										<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
										<path d="M5 12l5 5l10 -10" />
									</svg>
								</div>
								<label htmlFor="gift-purchase">Th{boxCount === 1 ? 'is box is' : 'ese boxes are'} being purchased as a gift.</label>
							</div>
							{isGift ? 
							<div className="store-summary-input">
								<input name="user-gift" type="number" onChange={(e) => setGiftRecipient(e.target.value)}/>
								<label htmlFor="user-gift">Gift recipient's user ID.</label>
							</div> : ''}
							{(Math.round(((boxCount * activeBox.price) + Number.EPSILON) * 100) / 100 < constants.MINIMUM_PURCHASE_VALUE) ?
								<div id="checkout-error">
									<p id="checkout-error-notice">Insufficient purchase amount.</p>
									<p id="checkout-error-help">Your order does not meet the minimum required value of ${constants.MINIMUM_PURCHASE_VALUE}.</p>
								</div>
							: ''}
							{(Math.round(((boxCount * activeBox.price) + Number.EPSILON) * 100) / 100 >= constants.MINIMUM_PURCHASE_VALUE) && isGift && !validGift ? 
								<div id="checkout-error">
									<p id="checkout-error-notice">The ID provided is invalid.</p>
									<p id="checkout-error-help">If you are unsure, you can find how to get an user ID <a href="https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID" rel="noreferrer noopener" target="_blank">here</a>.</p>
								</div>
							: ''}
						</div>
						{isGift ?
							validGift && agreedTOS && props.login.loggedIn && activeBox.price !== 0 && (Math.round(((boxCount * activeBox.price) + Number.EPSILON) * 100) / 100 >= constants.MINIMUM_PURCHASE_VALUE) ?
							<div id="store-summary-actions">
							<PaypalButton
								activeBox={activeBox}
								boxCount={boxCount}
								giftState={giftRecipient}
								login={props.login}
								Constants={constants}
								discount={props.discount && props.discount.percent * 100 || 0}
								setFinishState={finishState}
							/>
							<p id="store-summary-actions-message">You are still able to use your credit/debit card without signing in through PayPal. Scroll down in the popup window.</p>
						</div>
						: !props.login.loggedIn ? 
							<div id="store-summary-actions">
								<DiscordLogin />
								<p id="store-summary-actions-message">Before you purchase your <span className="text-highlight">shiny</span> new boxes you need to login to Discord.</p>
							</div>			
						: '' : ''}
						{!isGift && agreedTOS && props.login.loggedIn && activeBox.price !== 0 && (Math.round(((boxCount * activeBox.price) + Number.EPSILON) * 100) / 100 >= constants.MINIMUM_PURCHASE_VALUE) ?
							<div id="store-summary-actions">
								<PaypalButton
									activeBox={activeBox}
									boxCount={boxCount}
									giftState={null}
									login={props.login}
									Constants={constants}
									discount={props.discount && props.discount.percent * 100 || 0}
									setFinishState={finishState}
								/>
								<p id="store-summary-actions-message">You are still able to use your credit/debit card without signing in through PayPal. Scroll down in the popup window.</p>
							</div>
						: !isGift && !props.login.loggedIn ? 
							<div id="store-summary-actions">
								<DiscordLogin />
								<p id="store-summary-actions-message">Before you purchase your <span className="text-highlight">shiny</span> new boxes you need to login to Discord.</p>
							</div>			
						: ''}
					</div>
				</div>
			</>}
		</div>
	)
}

export default connect(store => store, null)(Loot);