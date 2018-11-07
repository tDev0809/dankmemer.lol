import React, { Component } from 'react';
import './Developer.css';
import { onClickLink } from '../Utils/Tracking.js';

class Developer extends Component {
  render() {
    let accounts = this.props.social.map(account => {
      return <a key={`${this.props.name}-${account.name}`} onClick={onClickLink(`${this.props.name}-${account.name}`)} href={account.link}>
        <img className="developer-account" src={`${account.name}.svg`}></img>
      </a>
    })
    return(
      <div className="developer">
        <span className="developer-name blurple">{this.props.name}</span>
        <div className="developer-social">
          <img className="developer-picture" src={`/${this.props.picture}`} 
          onMouseOver={e => (e.currentTarget.src = this.props.hover)}
          onMouseOut={e => (e.currentTarget.src = this.props.picture)}></img>
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