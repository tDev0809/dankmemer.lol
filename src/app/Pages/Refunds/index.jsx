import React, { PureComponent } from 'react';
import ReactGA from 'react-ga';

export default class Refunds extends PureComponent {
  componentDidMount () {
    ReactGA.pageview('/Refunds');
  }

  render() {
    return (
      <div className="content-legal">

<h1>Refund Policy</h1>
<p>Last updated: February 24, 2019</p>

<h2>PayPal Refunds</h2>
<p>We will issue refunds in certain cases. We will never accept "bully refund requests" aka PayPal chargebacks or emails demanding we refund "or else". Honestly, the nicer you are, the more likely we are to give you a full refund.</p>
<h4>Reasons for potential refunds:</h4>
<ul>
  <li>Fraud/Unauthorized Payemnts (requires proof, as this is the most common "bs" chargeback)</li>
  <li>Issues with getting lootboxes or donor perks</li>
</ul>
<p>To request a refund for a PayPal order, please use the dispute resolution center on PayPal, or email us at dankmemerbot@gmail.com</p>

<h2>Patreon Refunds</h2>
<p>We will issue refunds in very rare cases. The nicer you are, the more likely we are to give you a refund for up to a month worth of donor perks.</p>
<h4>Reasons for potential refunds:</h4>
<ul>
  <li>Fraud/Unauthorized Payments (requires proof, as this is the most common "bs" chargeback)</li>
  <li>Issues with getting lootboxes or donor perks</li>
  <li>Patreon API removes your perks before the end of the month (although we're more likely to just give you perks to finish out the month)</li>
</ul>
<p>To request a refund for a Patreon pledge, please use the message system on patreon, or email us at dankmemerbot@gmail.com</p>

      </div>
    );
  }
}