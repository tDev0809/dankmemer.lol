import React, { Component } from 'react';
import Table from '../../Table/Table';
import './Commands.css';

class Commands extends Component {
  constructor() {
    super();
    this.state = {
      categories: []
    };
  }

  componentWillMount() {
    fetch('http://localhost:3000/api/cmds')
      .then(results => {
        return results.json();
      }).then(data => {
        let cols = [[],[],[]]
        Object.keys(data).forEach((key, index) => {

          cols[index % 3].push(<Table key={key} category={key} data={data[key]}/>);
        })
        this.setState({categories: cols});
      })
  }

  render() {
    return(
      <div className="content">
        <div className="commands-page">
          <div className="command-column">
          {this.state.categories[0]}
          </div>
          <div className="command-column">
          {this.state.categories[1]}
          </div>
          <div className="command-column">
          {this.state.categories[2]}
          </div>
        </div>
      </div>
    )
  }
}

export default Commands;