import React, { Component, createRef } from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import { connect } from 'react-redux';

import './Loot.css';
import { boxes, Constants, clientIDs } from './data.json';

class Loot extends Component {
  constructor () {
    super();

    this.inputRef = createRef();
    this.paypalButton = null;
    this.state = {
      bannedCountry: false,
      hasAgreed: false,
      activeBox: boxes[0],
      succeededPayment: null,
      boxCount: 1
    };
  }

  async componentDidMount() {
    ReactGA.pageview('/loot');

    // Check for banned countries
    const country = await fetch('/api/country')
      .then(r => r.json());
    if (country.isBlocked) {
      return this.setState({ blockedCountry: country });
    }

    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.setAttribute('src', 'https://www.paypalobjects.com/api/checkout.min.js');

    script.onload = () => {
      const PaypalButton = paypal.Button.driver('react', { React, ReactDOM });
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
    };

    document.head.appendChild(script);
  }

  getSubtotal (returnRaw) {
    const raw = this.state.boxCount * this.state.activeBox.price;
    return returnRaw
      ? raw
      : raw.toFixed(2);
  }

  getDiscount (returnRaw) {
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
    return actions.payment.create({
      payment: {
        transactions: [ {
          amount: {
            total: this.getDiscountedSubtotal(),
            currency: 'USD',
            details: {
              subtotal: this.getSubtotal(),
              discount: this.getDiscount()
            }
          },
          custom: this.props.jwt,
          description: 'Meme Box Purchase',
          item_list: {
            items: [ {
              name: this.state.activeBox.name,
              quantity: this.state.boxCount,
              price: this.state.activeBox.price.toFixed(2),
              currency: 'USD'
            } ]
          }
        } ],
        note_to_payer: 'melmsie small wenis btw'
      }
    })
      .catch(err => {
        console.error(err);
        this.setState({ finish: { success: false } });
      });
  }

  onAuthorize (data, actions) {
    return actions.payment.execute()
      .then(r => {
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
      : Number(target.value);

    if ((boxCount <= 0 || boxCount >= 100) && target.value !== '') {
      target.value = boxCount <= 0
        ? 1
        : 99;

      return window.ree({
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
    this.setState({ activeBox: boxes[index] });
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

  render() {
    const Box = (box, boxIndex) => (
      <div
        key={boxIndex}
        className={`box${box.name === this.state.activeBox.name ? ' active' : ''}`}
        onClick={() => this.setActiveBox(boxIndex)}
      >
        <div className="box-header">{box.name}</div>
        <div className="box-description">{box.description}</div>
        <div className="box-yield">
          Amount of coins:
          <span className="box-piss"> {box.yield}</span><br />
          A <u>{box.randomItem.chance * 100}%</u> chance at a <i>{box.randomItem.keyword}-tiered</i> item.
        </div>
        <div className="box-price">${box.price.toFixed(2)}</div>
      </div>
    );

    if (this.state.finish) {
      const { success, data } = this.state.finish;

      return (
        <div className="content">
          {
            success
              ? (
                <div>
                  <div className="fancy-header absolute-unit">Success!</div>
                  <div style={{ fontSize: '22px' }}>
                    Your payment has successfully been made. You will receive your purchased boxes automatically.<br />
                    Should you have any issues, join <a href="https://discord.gg/FnP8m6q">the support server</a> and contact an administrator with your Payment ID:<br />
                  </div>
                  <code style={{ fontSize: '32px' }}>{data.paymentID}</code>
                </div>
              )
              : (
                <div>
                  <div className="fancy-header absolute-unit red">Fucky wucky.</div>
                  <div style={{ fontSize: '22px' }}>
                    Something went wrong while trying to {data ? 'process' : 'create'} your payment.<br />
                    Please join <a href="https://discord.gg/FnP8m6q">the support server</a> for help{data ? ' and contact an administrator with your Payment ID:' : '.'}<br />
                    {
                      data &&
                      <code style={{ fontSize: '32px' }}>{data.paymentID}</code>
                    }
                  </div>
                </div>
              )
          }
        </div>
      );
    } else if (this.state.blockedCountry) {
      return (
        <div className="content">
          <div className="fancy-header absolute-unit red">Sorry.</div>
          <div style={{ fontSize: '22px' }}>
            Loot boxes are declared illegal in your country. As a result, you are unable to purchase any boxes.<br />
            Alternatively, click <a href="https://www.google.com/search?q=flights+to+usa">here</a> to find flights to the Land of Freedom.
          </div>
          <div style={{ fontSize: '4px' }}>
            also {this.state.blockedCountry.country} gay lmao
          </div>
        </div>
      );
    }

    const minimumIsMet = this.getDiscountedSubtotal(true) > Constants.MINIMUM_PURCHASE_VALUE;
    const isLoggedIn = this.props.loggedIn;
    const hasAgreed = this.state.hasAgreed;

    let text;
    if (!hasAgreed) {
      text = 'You haven\'t agreed to the Terms of Service and refund policy.';
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

    return(
      <div className="content loot">
        <div className="fancy-header absolute-unit">Go on, honey. Go pick yourself a boxy box.</div>

        <div className="boxes">
          {boxes.map(Box)}
        </div>

        <div className="divider" />

        <div className="header">
          Amount of <span className="box-name">{this.state.activeBox.name}es</span>:
        </div>
        
        <input
          className="input"
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
          <span className="header">I agree to Dank Memer's <a href="/terms">Terms of Service</a> and <a href="/refunds">Refund Policy</a><span className="red">*</span></span>.
        </label>

        <div className="divider" />

        {lastSection}

        <div
          style={{
            opacity: (minimumIsMet && isLoggedIn && hasAgreed) ? 1 : 0
          }}
        >
          {this.paypalButton}
        </div>
      </div>
    )
  }
}

export default connect(store => store.login, null)(Loot);