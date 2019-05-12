import React, { PureComponent } from 'react';
import GenericPanel from './GenericPanel';

export default class GetPayment extends PureComponent {
  action (state) {
    console.log(state);
  }

  render () {
    return (
      <GenericPanel
        title='Find Transaction'
        dropdownHeader='Parameter'
        textAreaHeader='Value'
        defaultDropdown='appeal'
        options={['Discord ID', 'PayPal ID', 'PayPal E-Mail', 'Payment ID']}
        action={this.action.bind(this)}
        buttonText='Find'
      />
    );
  }
}