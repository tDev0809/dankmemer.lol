import React, { PureComponent } from 'react';
import './Developer.scss';

class Developer extends PureComponent {
  constructor () {
    super();
    
    this.state = {
      hovered: false
    };
  }

  render () {
    const picture = this.props[
      this.state.hovered
        ? 'hover'
        : 'picture'
    ];

    return (
      <div className="staff-member">
        <span className="staff-name blurple">
          {this.props.name}
        </span>
        <div className="staff-social">
          <img
            className="staff-picture"
            alt={`${this.props.name}'s avatar`}
            src={`/assets/${picture}`}
            onMouseOver={() => this.setState({ hovered: true })}
            onMouseOut={() => this.setState({ hovered: false })}
          />
          <p className="staff-about">
            {this.props.about}
          </p>
        </div>
        <div className="staff-accounts">
          {this.props.social.map(account => (
            <a key={`${this.props.name}-${account.name}`} href={account.link}>
              <img
                className="staff-account"
                alt={`${this.props.name}'s ${account.name} link`}
                src={`/assets/${account.name}.svg`}
              />
            </a>
          ))}
        </div>
      </div>
    );
  }
}

export default Developer;