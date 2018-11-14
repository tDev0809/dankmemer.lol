import React, { Component } from 'react';
import './CmdTable.css';

class CmdTable extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    //<tr><td>command</td><td>desc</td></tr> <- Per command
    let data = this.props.data;
    let tableData = data.map(commData  => {
      return(
      <tr className="command-tr" key={commData.triggers[0]}><td className="blurple">{commData.triggers[0]}</td><td>{commData.description}</td></tr>
      )
    })
    return(
      <div className="command-block">
        <table className="command-table">
          <tbody>
            {tableData}
          </tbody>
        </table>
      </div>
    )
  }
}

export default CmdTable;