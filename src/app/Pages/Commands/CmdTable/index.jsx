import React from 'react';
import './CmdTable.scss';

export default React.memo(({ data, category }) => (
  <div className="command-block">
    <h2 className="category-name">
      {category}
    </h2>
    <table className="command-table">
      <tbody>
        {data.map(command => (
          <tr className="command-tr" key={command.triggers[0]}>
            <td className="blurple">
              {command.triggers[0]}
            </td>
            <td>
              {command.description}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
));
