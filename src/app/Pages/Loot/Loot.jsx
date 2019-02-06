import React, { Component, createRef } from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';

import './Loot.css';

const sleep = (t) => new Promise(r => setTimeout(r, t));

const boxes = [{
  name: 'Normie Box',
  description: 'Can\'t get more basic than this.',
  yield: '150 ~ 800',
  randomItem: {
    keyword: 'low',
    chance: 0.6
  },
  price: 0.49
}, {
  name: 'Meme Box',
  description: 'Something actually worth opening.',
  yield: '750 ~ 3500',
  randomItem: {
    keyword: 'medium',
    chance: 0.7
  },
  price: 1.99
}, {
  name: 'Dank Box',
  description: 'Dank rewards for a dank user.',
  yield: '1000 ~ 10000',
  randomItem: {
    keyword: 'high',
    chance: 0.94
  },
  price: 3.99
}];

const MINIMUM_PURCHASE_VALUE = 1.95;
const MINIMUM_DISCOUNT_VALUE = 10;
const DISCOUNT_NEAREST = 1.50;

class Loot extends Component {
  constructor () {
    super();

    this.state = {
      selectedBox: 0,
      activeBox: boxes[0],
      succeededPayment: null,
      transitioning: null,
      boxCount: 1
    };

    this.inputRef = createRef();

    this.paypalButton = null;
  }

  componentDidMount() {
    ReactGA.pageview('/loot');

    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.setAttribute('src', 'https://www.paypalobjects.com/api/checkout.min.js');

    script.onload = () => {
      const PaypalButton = paypal.Button.driver('react', { React, ReactDOM });
      this.paypalButton = (
        <PaypalButton
          env="sandbox"
          style={{
            size: 'large',
            shape: 'rect',
            color: 'gold'
          }}
          payment={this.payment.bind(this)}
          onAuthorize={this.onAuthorize.bind(this)}
          onCancel={this.onCancel.bind(this)}
          client={{
            // TODO: move to conf
            sandbox: 'ATKDzslD3dByny_jqr9s2NexgCc2Id0_BiR9VKUHyQ-qX0uldGhg9pZ8CpS3E6It20qYzx8_YUKl4_iB'
          }}
        />
      );
    };

    document.head.appendChild(script);
  }

  getSubtotal () {
    return (this.state.boxCount * this.state.activeBox.price).toFixed(2);
  }

  getDiscountedSubtotal () {
    const subtotal = this.state.boxCount * this.state.activeBox.price;
    const discount = subtotal % DISCOUNT_NEAREST;
    if (
      subtotal <= MINIMUM_DISCOUNT_VALUE ||
      discount === 0
    ) {
      return subtotal.toFixed(2);
    }

    const discountedSubtotal = subtotal - discount;
    return discountedSubtotal.toFixed(2);
  }

  payment (_, actions) {
    return actions.payment.create({
      payment: {
        transactions: [ {
          amount: {
            total: this.getDiscountedSubtotal(),
            currency: 'USD'
          }
        } ]
      }
    });
  }

  onAuthorize (data, actions) {
    return actions.payment.execute()
      .then(() => {
        this.setState({ succeededPayment: data });
      })
      .catch(e => {
        // TODO
        console.error(e);
      });
  }

  onCancel (data) {
    // TODO
    console.log('on cancel', data);
  }

  onInput ({ target, value }) {
    let boxCount = value !== undefined
      ? value
      : Number(target.value);

    if (boxCount <= 0 && target.value !== '') {
      target.value = 1;
      return window.ree({
        duration: 1500,
        intensity: 35
      });
    }

    target.value = boxCount;
    this.setState({ boxCount });
  }
  
  async setActiveBox (selectedBox) {
    this.setState({ transitioning: 'out' });
    this.setState({ selectedBox });
    await sleep(150);
    this.setState({ activeBox: boxes[selectedBox] });
    this.setState({ transitioning: 'in' });
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
        className={`box${boxIndex === this.state.selectedBox ? ' active' : ''}`}
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

    if (this.state.succeededPayment) {
      return (
        <div className="content">
          <div className="fancy-header absolute-unit">Success!<br /></div>
          <div style={{ fontSize: '22px' }} >
            Your payment has successfully been made. You will receive your purchased boxes automatically.<br />
            Should you have any issues, join <a href="https://discord.gg/FnP8m6q">the support server</a> and contact an administrator with your Payment ID:<br />
          </div>
          <code style={{ fontSize: '32px' }}>{this.state.succeededPayment.orderID}</code>
        </div>
      )
    }

    const minimumIsMet = Number(this.getSubtotal()) < MINIMUM_PURCHASE_VALUE;

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
            this.getSubtotal() === this.getDiscountedSubtotal()
              ? <span>${this.getSubtotal()}</span>
              : <span><s><i>${this.getSubtotal()}</i></s> ${this.getDiscountedSubtotal()}</span>
          }
        </div>

        <div className="divider" />

        {
          minimumIsMet &&
          <div className="header red">
            You haven't met the minimum purchase value of ${MINIMUM_PURCHASE_VALUE.toFixed(2)}.
          </div>
        }

        <div
          style={{
            display: minimumIsMet ? 'none' : ''
          }}
        >
          {this.paypalButton}
        </div>
      </div>
    )
  }
}

export default Loot;