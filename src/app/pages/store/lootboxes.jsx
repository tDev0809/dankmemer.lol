import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as axios from 'axios';
import { connect } from 'react-redux';

import DiscordLogin from '../../components/discordLogin';
import PaypalButton from '../../components/paypalButton';

import EndSection from './views/EndSection.jsx';
import Box from '../../components/lootbox.jsx';
import BlockedCountry from './views/BlockedCountry.jsx';
import ree from '../../util/ree.js';
import parseTime from '../../util/parseTime.js';
import loadScript from '../../util/loadScript.js';

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
	const [constants, setConstants] = useState(null);
	const [activeBox, setActiveBox] = useState(box);
	const [bannedCountry, setBannedCountry] = useState(false);
	const [bannedUser, setBannedUser] = useState(false);
	const [agreedTOS, setAgreedTOS] = useState(false);
	const [successfulPayment, setSuccessfulPayment] = useState(null);
	const [boxCount, setBoxCount] = useState(1);
	const [isGift, setIsGift] = useState(null);
	const [giftRecipient, setGiftRecipient] = useState(0);

	const [validGift, setValidGift] = useState(false);

	useEffect(() => {
		axios.all([
			axios('/api/boxes'),
			axios('/api/country'),
			axios('/api/isBanned')
		]).then(axios.spread(({ data: {boxes, Constants} }, { data: { isBlocked }}, req3) => {
			setBoxes(boxes);
			setActiveBox(boxes[1])
			setConstants(Constants);
			setBannedCountry(isBlocked);
			setBannedUser(req3.status === 403);
		})).catch(e => {
			console.error(e);
		}); 
	}, []);

	useEffect(() => {
		if(isGift && giftRecipient.toString().length < 16 || giftRecipient.toString().length > 21) return setValidGift(true);
		else return setValidGift(false);
	}, [giftRecipient])

	useEffect(() => {
		setBoxCount(1);
	}, [activeBox])

	useEffect(() => {
		boxValue.current.value = boxCount;
	}, [boxCount])

	const finishState = (e) => {
		console.log(e);
	}

    const getSubtotal = (returnRaw) => {
        const raw = boxCount * activeBox.price;
        return returnRaw ? raw : raw.toFixed(2);
    }

    const getDiscountPercent = () => {
        const res = {};
        const subtotal = getSubtotal(true);
        let discountPercent = 0;
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
	
	useEffect(() => {
		console.log(giftRecipient.length);
	}, [giftRecipient])

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
		if(boxValue.current.value < 1) {
			boxValue.current.value = 1;
			setBoxCount(1)
		} else if(boxValue.current.value > 100) {
			boxValue.current.value = 100;
			setBoxCount(100);
		} else setBoxCount(boxValue.current.value)
	}

	return (
		<div id="store">
			<div id="store-boxes">
				{boxes.map((box, i) => (
					<div className={activeBox.id === i ? "store-box active" : "store-box"} onClick={() => setActiveBox(boxes[i])}>
						<h2 className="store-box-name">{box.name}</h2>
						<p className="store-box-price">${box.price}</p>
						{activeBox.id === i ?
						<div id="store-box-counter">
							<div id="store-box-counter-sub" onClick={() => changeBoxCount(false)}>
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 20" fill="none" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
									<line x1="5" y1="12" x2="19" y2="12" />
								</svg>
							</div>
							<input id="store-box-counter-num" type="number" ref={boxValue} defaultValue={1} onInput={() => updateBoxCount()} placeholder="Boxes" />
							<div id="store-box-counter-add" onClick={() => changeBoxCount(true)}>
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 20" fill="none" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
									<line x1="12" y1="5" x2="12" y2="19" />
									<line x1="5" y1="12" x2="19" y2="12" />
								</svg>
							</div>
						</div> : ''}
					</div>
				))}
			</div>
			<div id="store-items">
				<h2 id="store-items-title">Possible items</h2>
				<p id="store-items-message">Below includes a list of all possible items and the maximum amount of items you could receive from the purchase of a <span className="text-highlight">{activeBox.name}</span>! Along with these items, you have the chance of getting anywhere in the range of <span className="text-highlight">{activeBox.yield}</span> coins.</p>
				<table>
					<thead>
						<tr>
							<th>Item name</th>
							<th>Max. Amount</th>
						</tr>
					</thead>
					<tbody>
						{activeBox.items.map(({ name, amount }, i) => (
							<tr>
								<td>{name}</td>
								<td>{amount}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div id="store-summary">
				<h2 id="store-summary-title">Order summary</h2>
				<table id="store-summary-items">
					<tr>
						<td>{boxCount}x {activeBox.name}</td>
						<td>${Math.round(((boxCount * activeBox.price) + Number.EPSILON) * 100) / 100}</td>
					</tr>
					<tr>
						<td>Sales tax</td>
						<td>${constants ? (getDiscountedSubtotal(true) * 0.0675).toFixed(2) : ''}</td>
					</tr>
					<tr>
						<td></td>
						<td id="store-summary-total">Total: ${Math.round((parseFloat(constants ? (getDiscountedSubtotal(true) * 0.0675).toFixed(2) : 0) + parseFloat(boxCount * activeBox.price) + Number.EPSILON) * 100) / 100}</td>
					</tr>
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
						<label for="tos-privacy">I agree to Dank Memer’s <Link to="/terms">Terms of Service</Link> and <Link to="refunds">Refund Policy</Link>.</label><br/>
					</div>
					<div className="store-summary-input">
						<input name="gift-purchase" type="checkbox" onChange={(e) => setIsGift(e.target.checked)}/>
						<div className="store-summary-input-tick">
							<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
								<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
								<path d="M5 12l5 5l10 -10" />
							</svg>
						</div>
						<label for="gift-purchase">Th{boxCount === 1 ? 'is box is' : 'ese boxes are'} being purchased as a gift.</label>
					</div>
					{isGift ? 
					<div className="store-summary-input">
						<input name="user-gift" type="number" onChange={(e) => setGiftRecipient(e.target.value)}/>
						<label for="user-gift">Gift recipient's user ID.</label>
					</div> : ''}
					{validGift ? 
					<div id="checkout-error">
						<p id="checkout-error-notice">The ID provided is invalid.</p>
						<p id="checkout-error-help">If you are unsure, you can find how to get an user ID <a href="https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID" rel="noreferrer noopener" target="_blank">here</a>.</p>
					</div> : ''}
				</div>
				{isGift ? validGift && agreedTOS && props.login.loggedIn && constants && activeBox.price !== 0 : agreedTOS && props.login.loggedIn && constants && activeBox.price !== 0 ?
					<div id="store-summary-actions">
						<PaypalButton
							activeBox={activeBox}
							boxCount={boxCount}
							giftState={isGift}
							login={props.login}
							Constants={constants}
							discount={0}
							setFinishState={finishState}
						/>
					</div>
				: !props.login.loggedIn ? 
					<div id="store-summary-actions">
						<DiscordLogin />
						<p id="store-summary-actions-message">Before you purchase your <span className="text-highlight">shiny</span> new boxes. You need to login.</p>
					</div>			
				: ''}
			</div>
		</div>
	)
}

//   onInput ({ target, value }) {
//     let boxCount = value !== undefined
//       ? value
//       : Math.round(target.value);

//     if ((boxCount <= 0 || boxCount >= 101) && target.value !== '') {
//       boxCount = boxCount <= 0
//         ? 1
//         : 100;

//       ree({
//         duration: 1500,
//         intensity: 35
//       });
//     }

//     target.value = boxCount;
//     this.setState({ boxCount });
//   }

//   onCheck ({ target }) {
//     this.setState({ hasAgreed: target.checked });
//   }

//   onGift ({ target }) {
//     this.setState({ giftState: target.value === 'on' ? '' : target.value });
//   }

//   async setActiveBox (index) {
//     this.setState({ activeBox: this.state.boxes[index] });
//   }

//   onInputClick (increase) {
//     return () => {
//       let value = this.inputRef.current.value;
//       if (increase) {
//         value++;
//       } else {
//         value--;
//       }

//       this.onInput({ target: this.inputRef.current, value });
//     };
//   }

//   render () {
//     const { boxes, Constants, finish, blockedCountry, activeBox, bannedUser, giftState } = this.state;

//     if (finish) {
//       return (
//         <EndSection {...finish} />
//       );
//     } else if (blockedCountry) {
//       return (
//         <BlockedCountry {...blockedCountry} />
//       );
//     } else if (bannedUser) {
//       return (
//         <main className="content loot">
//           <div className="fancy-header absolute-unit red">Sorry, not sorry.</div>
//           <div style={{ fontSize: '22px' }}>
//             Your account has been banned from purchasing any lootboxes. NICE!
//           </div>
//         </main>
//       );
//     } else if (!boxes) {
//       return (
//         <div />
//       );
//     }

//     const minimumIsMet = this.getDiscountedSubtotal(true) > Constants.MINIMUM_PURCHASE_VALUE;
//     const isLoggedIn = this.props.login.loggedIn;
//     const hasAgreed = this.state.hasAgreed;
//     let giftIsValid = true;

//     let text;
//     if (!hasAgreed) {
//       text = 'You haven\'t agreed to the Terms of Service and Refund Policy.';
//     } else if (!minimumIsMet) {
//       text = `You haven't met the minimum purchase value of $${Constants.MINIMUM_PURCHASE_VALUE.toFixed(2)}.`;
//     } else if (
//       giftState !== null && (
//         giftState.length < 16 ||
//         giftState.length > 21 ||
//         isNaN(giftState)
//       )
//     ) {
//       giftIsValid = false;
//       text = (
//         <div>
//           The user ID you have entered for the gift user is invalid.<br />Please see <a href="https://support.discordapp.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-">this</a> link for more information on getting user IDs.
//         </div>
//       );
//     } else if (!isLoggedIn) {
//       text = (
//         <div>
//           You aren't logged in with your Discord account. <a href="/oauth/login?redirect=/loot">Click this</a> to log in.
//         </div>
//       );
//     }
//     const lastSection = (
//       <div className="header red">
//         {text}
//       </div>
//     );

//     return (
//       <main className="content loot">
//         <div className="fancy-header absolute-unit">{this.state.welcomeMessage}</div>

//         <div className="boxes">
//           {boxes.map((box, index) => !box.disabled && (
//             <Box
//               key={box.name}
//               index={index}
//               box={box}
//               isActive={activeBox.id === index}
//               setActiveBox={index => this.setActiveBox(index)}
//             />
//           ))}
//         </div>
//         <span className="discount-notification">
//           Purchases above <span className="green">${Constants.MINIMUM_DISCOUNT_VALUE}</span> receive a <u>{Constants.FLAT_DISCOUNT_PERCENTAGE}%</u> discount! {(() => {
//             const curSubtotal = this.getDiscountedSubtotal(true);
//             const discount = this.getDiscountPercent();
//             if (
//               this.state.activeBox.id !== 0 &&
//               curSubtotal > Constants.MINIMUM_DISCOUNT_VALUE &&
//               !discount.flat
//             ) {
//               return (
//                 <>
//                   <br />You have to spend <span className="green">${(discount.neededUntilFlat).toFixed(2)}</span> more for your purchase total to be above <span className="green">${Constants.MINIMUM_DISCOUNT_VALUE}</span> after the discount.
//                 </>
//               );
//             }
//           })()}
//         </span>
//         <br />
//         {this.props.discount && 
//           <span className="flash-discount-notification">
//             {this.props.discount.name} FLASH SALE: ALL purchases receive a BONUS <u>{this.props.discount.percent}%</u> discount!<br />{parseTime(this.props.discount.expiry - Date.now()).human} left.
//           </span>
//         }

//         <div className="divider" />
//         <div className="header">
//           Amount of <span className="selected-box-name">{activeBox.name}es</span>:
//         </div>
        
//         <span className="input-btn" onClick={this.onInputClick(false)}>–</span>
//         <input
//           className="box-input"
//           type="number"
//           onInput={ev => this.onInput(ev)}
//           defaultValue="1"
//           ref={this.inputRef}
//         />
//         <span className="input-btn" onClick={this.onInputClick(true)}>+</span>

//         <div className="divider" />
//         <div className="header">Subtotal:</div>
//         <div className="dolla-dolla-bills">
//           {
//             this.getDiscount(true) === 0
//               ? <span>${this.getSubtotal()}</span>
//               : <span>
//                   <s><i>${this.getSubtotal()}</i></s> ${this.getDiscountedSubtotal()}
//                   <div className="discount-info">
//                     ({(this.getDiscount(true) / this.getSubtotal(true) * 100).toFixed()}% total discount)
//                   </div>
//                 </span>
//           }
//         </div>

//         <div className="divider" />
//         <label className="tos-container">
//           <input type="checkbox" className="tos-checkbox" onChange={this.onCheck.bind(this)} />
//           <span className="tos-checkmark" />
//           <span className="header">
//             I agree to Dank Memer's <a href="/terms">Terms of Service</a> and <a href="/refunds">Refund Policy</a>
//             <span className="red">*</span>
//           </span>.
//         </label>

//         <div className="divider" />
//         <label className="gift-container">
//           {this.state.giftState === null ? (
//             <>
//               <input type="checkbox" className="gift-checkbox" onChange={this.onGift.bind(this)} />
//               <span className="gift-checkmark" />
//               <span className="header">
//                 This purchase is a gift.
//               </span>
//             </>
//           ) : (
//             <>
//               <span className="header">
//                 Gift User ID:
//               </span><br />
//               <input
//                 type="text"
//                 className="gift-textbox"
//                 onChange={this.onGift.bind(this)}
//                 value={this.state.giftState}
//               />
//             </>
//           )}
//         </label>
//         <div className="divider" />
//         {lastSection}

//         <div
//           style={{
//             display: (minimumIsMet && isLoggedIn && hasAgreed && giftIsValid) ? 'inline-block' : 'none',
//             width: '300px'
//           }}
//         >
//           {this.paypalButton}
//         </div>
//       </main>
//     )
//   }
// }

export default connect(store => store, null)(Loot);