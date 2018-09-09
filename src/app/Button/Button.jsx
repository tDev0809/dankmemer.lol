import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
  render() {
    let content = this.props.link ? <a href={this.props.link}>{this.props.content}</a> : this.props.content; 
    return(
      <button className="button">{content}</button>
    )
  }
}

export default Button;