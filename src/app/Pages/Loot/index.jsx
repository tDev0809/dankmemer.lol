import React, { Component, createRef } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { clientIDs } from './data.json';
import EndSection from './EndSection.jsx';
import Box from './Box.jsx';
import BlockedCountry from './BlockedCountry.jsx';
import createPayment from './createPayment.js';
import ree from '../../util/ree.js';
import parseTime from '../../util/parseTime.js';
import loadScript from '../../util/loadScript.js';

import './Loot.scss';

class Loot extends Component {
  inputRef = createRef();
  paypalButton = null;
  state = {
    boxes: null,
    activeBox: null,
    Constants: null,
    bannedCountry: false,
    bannedUser: false,
    hasAgreed: false,
    succeededPayment: null,
    boxCount: 1,
    giftState: null
  };

  async componentDidMount () {
    // Load boxes from API and set state
    const { boxes, Constants } = await fetch('/api/boxes')
      .then(r => r.json());

    this.setState({
      boxes,
      Constants,
      activeBox: boxes[1]
    });

    // Check for banned countries
    const country = await fetch('/api/country')
      .then(r => r.json());
    if (country.isBlocked) {
      return this.setState({ blockedCountry: country });
    }

    // Check for banned user
    const bannedUser = await fetch('/api/isBanned', { credentials: 'same-origin' });
    if (bannedUser.status === 403) {
      return this.setState({ bannedUser: true });
    }

    // Load and cache PayPal button
    await loadScript(`https://www.paypal.com/sdk/js?client-id=${clientIDs[__PAYPAL_ENV__]}`);
    const PaypalButton = window.paypal.Buttons.driver('react', { React, ReactDOM });
    this.paypalButton = (
      <PaypalButton
        env={__PAYPAL_ENV__}
        style={{
          height: 45,
          shape: 'rect',
          color: 'blue',
          tagline: false
        }}
        createOrder={(_, actions) => this.createOrder(actions)}
        onApprove={(_, actions) => this.onApprove(actions)}
      />
    );
    this.forceUpdate();
  }

  getSubtotal (returnRaw) {
    const raw = this.state.boxCount * this.state.activeBox.price;
    return returnRaw
      ? raw
      : raw.toFixed(2);
  }

  getDiscountPercent () {
    const { Constants } = this.state;
    const { discount } = this.props;
    const res = {};

    const subtotal = this.getSubtotal(true);
    
    let discountPercent = 0;
    if (discount) {
      discountPercent += discount.percent;
      res.discount = true;
    }
    const hypothetical = (subtotal * ((100 - (discountPercent + Constants.FLAT_DISCOUNT_PERCENTAGE)) / 100));
    if (
      hypothetical >= Constants.MINIMUM_DISCOUNT_VALUE
    ) {
      discountPercent += Constants.FLAT_DISCOUNT_PERCENTAGE;
      res.flat = true;
    } else {
      res.neededUntilFlat = Constants.MINIMUM_DISCOUNT_VALUE - hypothetical;
    }

    res.discountPercent = discountPercent;

    return res;
  }

  getDiscount (returnRaw) {
    const subtotal = this.getSubtotal(true);
    const discountPercent = this.getDiscountPercent();
    
    const raw = this.state.activeBox.id !== 0
      ? subtotal * (discountPercent.discountPercent / 100)
      : 0;

    return returnRaw
      ? raw
      : raw.toFixed(2);
  }

  getDiscountedSubtotal (returnRaw) {
    const raw = this.getSubtotal(true) - Number(this.getDiscount());
    return returnRaw
      ? raw
      : raw.toFixed(2);
  }

  createOrder (actions) {
    const p = createPayment({
      total: this.getDiscountedSubtotal(true),
      subtotal: this.getSubtotal(true),
      discount: this.getDiscount(true),
      token: this.props.login.token,
      activeBox: this.state.activeBox,
      boxCount: this.state.boxCount,
      salesTax: (this.getDiscountedSubtotal(true) * 0.0675).toFixed(2),
      ...(this.state.giftState === null ? {} : {
        giftUserID: this.state.giftState
      })
    });

    return actions.order.create(p)
      .catch(err => {
        console.error(err);
        this.setState({ finish: { success: false } });
      });
  }

  onApprove (actions) {
    return actions.order.capture()
      .then(data => {
        console.log(data);
        this.setState({ finish: { success: true, data } });
      })
      .catch(err => {
        console.error(err);
        this.setState({ finish: { success: false, err } });
      });
  }

  onInput ({ target, value }) {
    let boxCount = value !== undefined
      ? value
      : Math.round(target.value);

    if ((boxCount <= 0 || boxCount >= 101) && target.value !== '') {
      boxCount = boxCount <= 0
        ? 1
        : 100;

      ree({
        duration: 1500,
        intensity: 35
      });
    }

    target.value = boxCount;
    this.setState({ boxCount });
  }

  onCheck ({ target }) {
    this.setState({ hasAgreed: target.checked });
  }

  onGift ({ target }) {
    this.setState({ giftState: target.value === 'on' ? '' : target.value });
  }

  async setActiveBox (index) {
    this.setState({ activeBox: this.state.boxes[index] });
  }

  onInputClick (increase) {
    return () => {
      let value = this.inputRef.current.value;
      if (increase) {
        value++;
      } else {
        value--;
      }

      this.onInput({ target: this.inputRef.current, value });
    };
  }

  render () {
    const { boxes, Constants, finish, blockedCountry, activeBox, bannedUser, giftState } = this.state;

    if (finish) {
      return (
        <EndSection {...finish} />
      );
    } else if (blockedCountry) {
      return (
        <BlockedCountry {...blockedCountry} />
      );
    } else if (bannedUser) {
      return (
        <main className="content loot">
          <div className="fancy-header absolute-unit red">Sorry, not sorry.</div>
          <div style={{ fontSize: '22px' }}>
            Your account has been banned from purchasing any lootboxes.
          </div>
        </main>
      );
    } else if (!boxes) {
      return (
        <div />
      );
    }

    const minimumIsMet = this.getDiscountedSubtotal(true) > Constants.MINIMUM_PURCHASE_VALUE;
    const isLoggedIn = this.props.login.loggedIn;
    const hasAgreed = this.state.hasAgreed;
    let giftIsValid = true;

    let text;
    if (!hasAgreed) {
      text = 'You haven\'t agreed to the Terms of Service and Refund Policy.';
    } else if (!minimumIsMet) {
      text = `You haven't met the minimum purchase value of $${Constants.MINIMUM_PURCHASE_VALUE.toFixed(2)}.`;
    } else if (
      giftState !== null && (
        giftState.length < 16 ||
        giftState.length > 21 ||
        isNaN(giftState)
      )
    ) {
      giftIsValid = false;
      text = (
        <div>
          The user ID you have entered for the gift user is invalid.<br />Please see <a href="https://support.discordapp.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-">this</a> link for more information on getting user IDs.
        </div>
      );
    } else if (!isLoggedIn) {
      text = (
        <div>
          You aren't logged in with your Discord account. <a href="/oauth/login?redirect=/loot">Click this</a> to log in.
        </div>
      );
    }
    const lastSection = (
      <div className="header red">
        {text}
      </div>
    );

    return (
      <main className="content loot">
        <div className="fancy-header absolute-unit">Go on, honey. Go pick yourself a boxy box.</div>

        <div className="boxes">
          {boxes.map((box, index) => !box.disabled && (
            <Box
              key={box.name}
              index={index}
              box={box}
              isActive={activeBox.id === index}
              setActiveBox={index => this.setActiveBox(index)}
            />
          ))}
        </div>
        <span className="discount-notification">
          Purchases above <span className="green">${Constants.MINIMUM_DISCOUNT_VALUE}</span> receive a <u>{Constants.FLAT_DISCOUNT_PERCENTAGE}%</u> discount! {(() => {
            const curSubtotal = this.getDiscountedSubtotal(true);
            const discount = this.getDiscountPercent();
            if (
              this.state.activeBox.id !== 0 &&
              curSubtotal > Constants.MINIMUM_DISCOUNT_VALUE &&
              !discount.flat
            ) {
              return (
                <>
                  <br />You have to spend <span className="green">${(discount.neededUntilFlat).toFixed(2)}</span> more for your purchase total to be above <span className="green">${Constants.MINIMUM_DISCOUNT_VALUE}</span> after the discount.
                </>
              );
            }
          })()}
        </span>
        <br />
        {this.props.discount && 
          <span className="flash-discount-notification">
            {this.props.discount.name} FLASH SALE: ALL purchases receive a BONUS <u>{this.props.discount.percent}%</u> discount!<br />{parseTime(this.props.discount.expiry - Date.now()).human} left.
          </span>
        }

        <div className="divider" />
        <div className="header">
          Amount of <span className="selected-box-name">{activeBox.name}es</span>:
        </div>
        
        <span className="input-btn" onClick={this.onInputClick(false)}>–</span>
        <input
          className="box-input"
          type="number"
          onInput={ev => this.onInput(ev)}
          defaultValue="1"
          ref={this.inputRef}
        />
        <span className="input-btn" onClick={this.onInputClick(true)}>+</span>

        <div className="divider" />
        <div className="header">Subtotal:</div>
        <div className="dolla-dolla-bills">
          {
            this.getDiscount(true) === 0
              ? <span>${this.getSubtotal()}</span>
              : <span>
                  <s><i>${this.getSubtotal()}</i></s> ${this.getDiscountedSubtotal()}
                  <div className="discount-info">
                    ({(this.getDiscount(true) / this.getSubtotal(true) * 100).toFixed()}% total discount)
                  </div>
                </span>
          }
        </div>

        <div className="divider" />
        <label className="tos-container">
          <input type="checkbox" className="tos-checkbox" onChange={this.onCheck.bind(this)} />
          <span className="tos-checkmark" />
          <span className="header">
            I agree to Dank Memer's <a href="/terms">Terms of Service</a> and <a href="/refunds">Refund Policy</a>
            <span className="red">*</span>
          </span>.
        </label>

        <div className="divider" />
        <label className="gift-container">
          {this.state.giftState === null ? (
            <>
              <input type="checkbox" className="gift-checkbox" onChange={this.onGift.bind(this)} />
              <span className="gift-checkmark" />
              <span className="header">
                This purchase is a gift.
              </span>
            </>
          ) : (
            <>
              <span className="header">
                Gift User ID:
              </span><br />
              <input
                type="text"
                className="gift-textbox"
                onChange={this.onGift.bind(this)}
                value={this.state.giftState}
              />
            </>
          )}
        </label>
        <div className="divider" />
        {lastSection}

        <div
          style={{
            display: (minimumIsMet && isLoggedIn && hasAgreed && giftIsValid) ? 'inline-block' : 'none',
            width: '300px'
          }}
        >
          {this.paypalButton}
        </div>
      </main>
    )
  }
}

export default connect(store => store, null)(Loot);