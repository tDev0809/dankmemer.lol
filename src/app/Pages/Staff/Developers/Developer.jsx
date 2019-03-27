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
    return (
      <div className="staff-member">
        <span className="staff-name blurple">
          {this.props.name}
        </span>
        <div className="staff-social">
          <img
            className="staff-picture"
            alt={`${this.props.name}'s avatar`}
            src={`/assets/${this.props.picture}`}
          />
          <p className="staff-about">
            {this.props.about}
          </p>
        </div>
        <div className="staff-accounts">
          {Object.entries(this.props.social).map(([ name, link ]) => (
            <a key={name} href={link}>
              <img
                className="staff-account"
                alt={`${this.props.name}'s ${name} link`}
                src={`/assets/${name}.svg`}
              />
            </a>
          ))}
        </div>
      </div>
    );
  }
}

export default Developer;