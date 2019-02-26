import React, { PureComponent } from 'react';
import CmdTable from './CmdTable';
import ReactGA from 'react-ga';

import './Commands.scss';

export default class Commands extends PureComponent {
  constructor() {
    super();

    this.state = {
      columns: []
    };
  }

  componentDidMount() {
    ReactGA.pageview('/commands');

    if (window.location.search) {
      window.history.pushState(null, null, 'commands');
    }
  }

  async componentWillMount () {
    const columns = Array(3).fill(0).map(() => []);
    const entries = await fetch('commands.json')
      .then(res => res.json())
      .then(Object.entries);

    for (const entry of entries) {
      const [ category, data ] = entry;
      let index;

      switch (category) {
        case '😏 NSFW':
          continue;

        case '🐶 Animals':
        case '😄 Fun':
        case '😂 Memey':
        case '🔊 Sound':
        case '🎲 Games':
          index = 0;
          break;

        case '⚙ Config':
        case '🔨 Moderation':
        case '🆗 Text':
        case '🛠 Utility':
          index = 1;
          break;

        case '💰 Currency':
        case '📷 Image':
          index = 2;
          break;

        default:
          index = entries.indexOf(entry) % columns.length;
      }

      columns[index].push({ category, data });
    }

    this.setState({ columns });
  }

  render () {
    return (
      <div className="content commands-page">
        {this.state.columns.map((tables, index) => (
          <div key={index} className="command-column">
            {tables.map(data => (
              <CmdTable key={data.category} {...data} />
            ))}
          </div>
        ))}
      </div>
    );
  }
}
