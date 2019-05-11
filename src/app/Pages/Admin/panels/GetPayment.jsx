import React, { PureComponent } from 'react';

export default class GetPayment extends PureComponent {
  state = {
    type: 'Discord ID'
  };

  render () {
    return (
      <section>
        <div className="section-header">Find Transaction</div>

        <label>
          Parameter<br />
          <select
            value={this.state.type}
            onChange={e => this.setState({ type: e.target.value })}
          >
            <option value="Discord ID">
              Discord ID
            </option>
            <option value="PayPal ID">
              PayPal ID
            </option>
            <option value="PayPal E-Mail">
              PayPal E-Mail
            </option>
            <option value="Payment ID">
              Payment ID
            </option>
          </select>
        </label>

        <label>
          {this.state.type}<br />
          <input
            value={this.state.data}
            onChange={e => this.setState({ data: e.target.value })}
          />
        </label>

        <label>
          <button onClick={() => this.action()}>Find</button>
        </label>
      </section>
    );
  }
}