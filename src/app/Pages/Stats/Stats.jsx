import React, { Component } from 'react';
import './Stats.css';

class Stats extends Component {
    constructor() {
        super();
        this.state = {
          stats: {}
        };
      }

    componentDidMount() {
        fetch('/api/stats')
          .then(results => {
            return results.json();
          }).then(data => {
            this.setState({stats: data});
          })
      }

  render() {
    return(
      <div className="content">
        <h1 className="title">Dank Memer Stats</h1>
        <div className="statSection">
            <div className="statGroup">
                <h4 className="statValue">Servers</h4>
                <div className="statValue"> {this.state.stats.guilds}</div>
            </div>
            <div className="statGroup">
                <h4 className="statValue">Users</h4>
                <div className="statValue">{this.state.stats.users}</div>
            </div>
            <div className="statGroup">
                <h4 className="statValue">Memory</h4>
                <div className="statValue">{this.state.stats.ram}GB</div>
            </div>
        </div>
      </div>
    )
  }
}

export default Stats;