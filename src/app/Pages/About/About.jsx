import React, { Component } from 'react';
import DeveloperList from '../../Developers/DeveloperList';
import './About.css';

class About extends Component {
  render() {
    return(
      <div className="content">
        <DeveloperList />
      </div>
    )
  }
}

export default About;