import React, { Component, createRef } from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import { connect } from 'react-redux';

import { clientIDs } from './data.json';
import EndSection from './EndSection.jsx';
import Box from './Box.jsx';
import BlockedCountry from './BlockedCountry.jsx';
import createPayment from './createPayment.js';
import ree from '../../util/ree.js';
import loadScript from '../../util/loadScript.js';

import './Loot.scss';

class Loot extends Component {
  constructor () {
    super();

    this.inputRef = createRef();
    this.paypalButton = null;
    this.state = {
      boxes: null,
      activeBox: null,
      Constants: null,
      bannedCountry: false,
      hasAgreed: false,
      succeededPayment: null,
      boxCount: 1
    };
  }

  async componentDidMount () {
    ReactGA.pageview('/lootboxes');

    // Load boxes from API and set state
    const { boxes, Constants } = await fetch('/api/boxes')
      .then(r => r.json());

    this.setState({
      boxes,
      Constants,
      activeBox: boxes[0]
    });

    // Check for banned countries
    const country = await fetch('/api/country')
      .then(r => r.json());
    if (country.isBlocked) {
      return this.setState({ blockedCountry: country });
    }

    // Load and cache PayPal button
    await loadScript('https://www.paypalobjects.com/api/checkout.min.js');
    const PaypalButton = window.paypal.Button.driver('react', { React, ReactDOM });
    this.paypalButton = (
      <PaypalButton
        env={__PAYPAL_ENV__}
        style={{
          size: 'large',
          shape: 'rect',
          color: 'blue'
        }}
        payment={this.payment.bind(this)}
        onAuthorize={this.onAuthorize.bind(this)}
        onCancel={() => {}}
        client={clientIDs}
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

  getDiscount (returnRaw) {
    const { Constants } = this.state;

    const subtotal = this.getSubtotal(true);
    const raw = subtotal >= Constants.MINIMUM_DISCOUNT_VALUE && this.state.activeBox.id !== 0
      ? subtotal % Constants.DISCOUNT_NEAREST
      : 0;

    return returnRaw
      ? raw
      : raw.toFixed(2);
  }

  getDiscountedSubtotal (returnRaw) {
    const raw = this.getSubtotal(true) - this.getDiscount(true);
    return returnRaw
      ? raw
      : raw.toFixed(2);
  }

  payment (_, actions) {
    return actions.payment.create(createPayment({
      discountedSubtotal: this.getDiscountedSubtotal(),
      subtotal: this.getSubtotal(),
      discount: this.getDiscount(),
      jwt: this.props.jwt,
      activeBox: this.state.activeBox,
      boxCount: this.state.boxCount
    }))
      .catch(err => {
        console.error(err);
        this.setState({ finish: { success: false } });
      });
  }

  onAuthorize (data, actions) {
    return actions.payment.execute()
      .then(() => {
        this.setState({ finish: { success: true, data } });
      })
      .catch(err => {
        this.setState({ finish: { success: false, data } });
        console.error(err);
      });
  }

  onInput ({ target, value }) {
    let boxCount = value !== undefined
      ? value
      : Math.round(target.value);

    if ((boxCount <= 0 || boxCount >= 100) && target.value !== '') {
      target.value = boxCount <= 0
        ? 1
        : 99;

      return ree({
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
    const { boxes, Constants, finish, blockedCountry, activeBox } = this.state;

    if (finish) {
      return (
        <EndSection {...finish} />
      );
    } else if (blockedCountry) {
      return (
        <BlockedCountry {...blockedCountry} />
      );
    } else if (!boxes) {
      return (
        <div />
      );
    }

    const minimumIsMet = this.getDiscountedSubtotal(true) > Constants.MINIMUM_PURCHASE_VALUE;
    const isLoggedIn = this.props.loggedIn;
    const hasAgreed = this.state.hasAgreed;

    let text;
    if (!hasAgreed) {
      text = 'You haven\'t agreed to the Terms of Service and Refund Policy.';
    } else if (!minimumIsMet) {
      text = `You haven't met the minimum purchase value of $${Constants.MINIMUM_PURCHASE_VALUE.toFixed(2)}.`;
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
          {boxes.map((box, index) => (
            <Box
              key={box.name}
              index={index}
              box={box}
              activeBox={this.state.activeBox}
              setActiveBox={index => this.setActiveBox(index)}
            />
          ))}
        </div>

        <div className="divider" />
        <div className="header">
          Amount of <span className="selected-box-name">{activeBox.name}es</span>:
        </div>
        
        <input
          className="box-input"
          type="number"
          onInput={ev => this.onInput(ev)}
          defaultValue="1"
          ref={this.inputRef}
        />
        <span className="input-btn" onClick={this.onInputClick(true)}>+</span>
        <span className="input-btn" onClick={this.onInputClick(false)}>–</span>

        <div className="divider" />
        <div className="header">Subtotal:</div>
        <div className="dolla-dolla-bills">
          {
            this.getDiscount(true) === 0
              ? <span>${this.getSubtotal()}</span>
              : <span><s><i>${this.getSubtotal()}</i></s> ${this.getDiscountedSubtotal()}</span>
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
        {lastSection}

        <div
          style={{
            opacity: +(minimumIsMet && isLoggedIn && hasAgreed)
          }}
        >
          {this.paypalButton}
        </div>
      </main>
    )
  }
}

export default connect(store => store.login, null)(Loot);