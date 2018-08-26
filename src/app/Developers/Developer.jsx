import React, { Component } from 'react';
import './Developer.css';

class Developer extends Component {
  render() {
    let accounts = this.props.social.map(account => {
      return <a href={account.link}>
        <img className="developer-account" key={`${this.props.name}-${account.name}`}src={`${account.name}.svg`}></img>
      </a>
    })
    return(
      <div className="developer">
        <span className="developer-name blurple">{this.props.name}</span>
        <div className="developer-social">
          <img className="developer-picture" src={`/${this.props.picture}`}></img>
          <p className="developer-about">{this.props.about}</p>
        </div>
        <div className="developer-accounts">
          {accounts}
        </div>
      </div>
    )
  }
}

export default Developer;