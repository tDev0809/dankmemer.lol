import React from 'react';
import './Premium.css';

export default class Prem extends React.PureComponent {
    render () {
      const { entry } = this.props;
      let listItems = entry.perks.map(x => <p>{x}</p>)
      let list = entry.special.map(x => <p>{x}</p>)
      return (
        <li className="spacing">
            <div className="top">
                <h1>{entry.name}</h1>
                <div><h3>${entry.price}/m</h3></div>
            </div>
            <div className="bottom">
                {listItems}
                AND
                {list}
                <div className="sign">
                    <a href={entry.link} className='button'>Purchase</a>
                </div>
            </div>
        </li>
      )
    }
  }