import React from 'react';

class GenericBanPanel extends React.PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      dropdownVal: props.defaultDropdown,
      textVal: ''
    };
  }

  render () {
    return (
      <section>
        <div className="section-header">{this.props.title}</div>

        <label>
          {this.props.dropdownHeader || this.state.dropdownVal}<br />
          <select
            value={this.state.dropdownVal}
            onChange={e => this.setState({ dropdownVal: e.target.value })}
          >
            {this.props.options.map(option => (
              <option
                value={option}
                key={option}
              >
                {option}
              </option>
            ))}
          </select>
        </label>

        <label>
          {this.props.textAreaHeader}<br />
          <input
            type="text"
            value={this.state.textVal}
            onChange={e => this.setState({ textVal: e.target.value })}
          />
        </label>

        <label>
          <button onClick={() => this.props.action(this.state)}>
            {this.props.buttonText}
          </button>
        </label>
      </section>
    );
  }
}

export default GenericBanPanel;