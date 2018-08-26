import React, { Component } from 'react';
import Table from '../../Table/Table';
import './Commands.css';

class Commands extends Component {
  render() {
    return(
      <div className="content">
        <Table data={[{command: "meme", desc: "maek meems"}, {command: "memegen", desc: "generate dem meems"}, {command: "meirl", desc: "same tbh"}]}/>
      </div>
    )
  }
}

export default Commands;