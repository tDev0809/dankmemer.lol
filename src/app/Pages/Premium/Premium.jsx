import React, { Component } from 'react';
import Prem from './Prem.jsx';
import './Premium.css';
import ReactGA from 'react-ga';
class Premium extends Component {
    constructor() {
        super();
        this.state = {
          data: []
        };
      }

      componentDidMount() {
        ReactGA.pageview('/premium');
      }

      componentWillMount() {
        fetch('api/premium')
          .then(results => {
            return results.json();
          }).then(info => {
            this.setState({data: info});
          })
      }

  render() {
    return(
      <div className="content">
        <div className="wrap">
          <div className="table command-column">
            <ul className="noul center">
              {this.state.data.map(entry => (<Prem entry={entry} />))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Premium;