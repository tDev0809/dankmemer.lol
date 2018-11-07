import React, { Component } from 'react';
import DeveloperList from '../../Developers/DeveloperList';
import './Devs.css';
import ReactGA from 'react-ga';
class About extends Component {
  componentDidMount() {
    ReactGA.pageview('/devs');
  }
  render() {
    return(
      <div className="content">
        <DeveloperList />
      </div>
    )
  }
}

export default About;