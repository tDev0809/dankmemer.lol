import React, { PureComponent } from 'react';
import GenericPanel from './GenericPanel';
import createModal from '../../../components/modal';
import ReactJSON from 'react-json-view';
import reactJSONProps from './reactJSONProps';

export default class GetPayment extends PureComponent {
  async action (state) {
    const res = await fetch(`/api/admin/findTransaction?${state.dropdownVal}=${state.textVal}`, {
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => res.map(payment => ({
        date: new Date(payment.times.create),
        orderID: payment.orderID,
        captureID: payment.captureID,
        purchase: {
          type: payment.item.name,
          quantity: +payment.item.quantity,
          total: payment.amount.total
        },
        payer: [ 'name', 'paypalEmail', 'discordEmail', 'paypalID', 'userID' ]
          .reduce((data, key) => ({ ...data, [key]: payment.payer[key] }), {})
      })));

    createModal(
      <ReactJSON
        src={res}
        { ...reactJSONProps }
      />
    );
  }

  render () {
    return (
      <GenericPanel
        title='Find Transaction'
        dropdownHeader='Parameter'
        textAreaHeader='Value'
        defaultDropdown='Discord ID'
        options={['Discord ID', 'PayPal E-Mail', 'Full Name', 'Payment ID']}
        action={this.action.bind(this)}
        buttonText='Find'
      />
    );
  }
}