import React, { Component } from 'react';
import CmdTable from '../../CmdTable/CmdTable';
import './Commands.css';
import ReactGA from 'react-ga';

class Commands extends Component {
  constructor() {
    super();
    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    ReactGA.pageview('/commands');
  }

  componentWillMount() {
    fetch('commands.json')
      .then(results => {
        return results.json();
      }).then(data => {
        let cols = [[],[],[]]
        Object.keys(data).forEach((key, index) => {
          let one = ['🐶 Animals', '😄 Fun', '😂 Memey', '🔊 Sound', '😏 NSFW'] //Temporary until redo the command page to be sorted by tabs (each category it's own tab)
          let two = ['⚙ Config', '🔨 Moderation', '🆗 Text', '🛠 Utility']
          let three = ['🎲 Games', '💰 Currency', '📷 Image']
          if (one.includes(key)) {
            cols[0].push(<CmdTable key={key} category={key} data={data[key]}/>);
          } else if (two.includes(key)) {
            cols[1].push(<CmdTable key={key} category={key} data={data[key]}/>);
          } else if (three.includes(key)) {
            cols[2].push(<CmdTable key={key} category={key} data={data[key]}/>);
          } else {
          cols[index % 3].push(<CmdTable key={key} category={key} data={data[key]}/>);
          }
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