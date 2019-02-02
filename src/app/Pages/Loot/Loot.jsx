import React, { Component, createRef } from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import paypal from 'paypal-checkout';
const PaypalButton = paypal.Button.driver('react', { React, ReactDOM });

import './Loot.css';

const sleep = (t) => new Promise(r => setTimeout(r, t));

const boxes = [{
  name: 'Normie Box',
  description: 'Can\'t get more basic than this.',
  yield: '150 ~ 800',
  price: 0.50
}, {
  name: 'Meme Box',
  description: 'Something actually worth opening.',
  yield: '750 ~ 3500',
  price: 2.00
}, {
  name: 'Dank Box',
  description: 'Dank rewards for a dank user.',
  yield: '1000 ~ 10000',
  price: 4.00
}];


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
  }

  componentDidMount() {
    ReactGA.pageview('/loot');
  }

  getSubtotal () {
    return (Number(this.state.boxCount) * this.state.activeBox.price).toFixed(2);
  }

  payment (_, actions) {
    return actions.payment.create({
      payment: {
        transactions: [ {
          amount: {
            total: this.getSubtotal(),
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

  onInput ({ target }) {
    this.setState({ boxCount: target.value });
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
      const { current } = this.inputRef;
      if (increase) {
        current.value++;
      } else {
        current.value--;
      }

      this.onInput({ target: current });
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
          <span className="box-piss"> {box.yield}</span>
        </div>
        <div className="box-price">${box.price.toFixed(2)}</div>
      </div>
    );

    const style = {};
    if (this.state.transitioning === 'in') {
      style.opacity = 1;
    } else if (this.state.transitioning === 'out') {
      style.opacity = 0;
    }

    if (this.state.succeededPayment) {
      return (
        <div className="content">
          <div className="fancy-header absolute-unit">Success!<br /></div>
          <div style={{ fontSize: '22px' }} >
            Your payment has successfully been made. You will receive your purchased boxes automatically.<br />
            Should you have any issues, join <a href="https://TODO">the support server</a> and contact an administrator with your Payment ID:<br />
          </div>
          <code style={{ fontSize: '32px' }}>{this.state.succeededPayment.orderID}</code>
        </div>
      )
    }

    return(
      <div className="content">
        <div className="fancy-header">Go on, honey. Go pick yourself a boxy box.</div>

        <div className="boxes">
          {boxes.map(Box)}
        </div>

        <div style={style} className="header">
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

        <div className="header">Subtotal:</div>
        <div style={style} className="dolla-dolla-bills">
          ${this.getSubtotal()}
        </div>

        <PaypalButton
          env="sandbox"
          payment={this.payment.bind(this)}
          onAuthorize={this.onAuthorize.bind(this)}
          onCancel={this.onCancel.bind(this)}
          commit={true}
          client={{
            // TODO: move to conf
            sandbox: 'ATKDzslD3dByny_jqr9s2NexgCc2Id0_BiR9VKUHyQ-qX0uldGhg9pZ8CpS3E6It20qYzx8_YUKl4_iB'
          }}
        />
      </div>
    )
  }
}

export default Loot;