import React from 'react';

class GenericBanPanel extends React.PureComponent {
  constructor (props) {
    super(props);

    this.state = {
      type: props.defaultBanType || 'appeal',
      id: ''
    };
  }

  async action () {
    if (!this.state.id) {
      return alert('enter a user id dumb cunt');
    }

    const res = await fetch(`/api/admin${this.props.getEndpoint(this.state)}`, {
      ...this.props.getFetchParams(this.state),
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (res.status !== 200) {
      alert(`Unknown HTTP response code: ${res.status}`);
    } else {
      this.props.finish(this.state, res);
    }
  }

  render () {
    return (
      <section>
        <div className="section-header">{this.props.title}</div>

        <label>
          Ban Type<br />
          <select
            value={this.state.type}
            onChange={e => this.setState({ type: e.target.value })}
          >
            {this.props.options.concat('appeal', 'lootbox').map(option => (
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
          User ID<br />
          <input
            value={this.state.id}
            onChange={e => !isNaN(e.target.value) && this.setState({ id: e.target.value })}
          />
        </label>

        <label>
          <button onClick={() => this.action()}>{this.props.buttonText}</button>
        </label>
      </section>
    );
  }

  static defaultProps = {
    getFetchParams: (state) => ({
      method: 'POST',
      body: JSON.stringify(state)
    }),
    options: []
  };
}

export default GenericBanPanel;