import React, { Component } from 'react';
import './Admin.css';
import { connect } from 'react-redux';
import ReactGA from 'react-ga';
class Admin extends Component {
  componentDidMount() {
    ReactGA.pageview('/admin');
  }

  render() {
    return(
      <div className="content">
        <h1 className="title">Admin Panel</h1>
        {this.props.isAdmin ? <p>Not yet</p>: <p>yikes</p>}
      </div>
    )
  }
}

export default connect(store => store.login)(Admin);