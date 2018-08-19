import React, { Component } from 'react';
import './Table.css';

class Table extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    //<tr><td>command</td><td>desc</td></tr> <- Per command
    let data = this.props.data;
    let tableData = [];
    data.forEach( (commData,index)  => tableData.push(<tr className="command-tr" key={index}><td className="blurple">{commData.command}</td><td>{commData.desc}</td></tr>))
    return(
      <table className="command-table">
        <tbody>
          {tableData}
        </tbody>
      </table>
    )
  }
}

export default Table;