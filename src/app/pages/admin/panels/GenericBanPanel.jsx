import React from 'react';
import GenericPanel from './GenericPanel';

class GenericBanPanel extends React.PureComponent {
  render () {
    return (
      <GenericPanel
        title={this.props.title}
        dropdownHeader="Ban Type"
        textAreaHeader="User ID"
        defaultDropdown="appeal"
        options={this.props.options.concat('appeal', 'lootbox')}
        action={this.action.bind(this)}
        buttonText={this.props.buttonText}
      />
    );
  }

  async action (state) {
    if (!state.textVal) {
      return alert('enter a user id dumb cunt');
    }

    const res = await fetch(`/api/admin${this.props.getEndpoint(state)}`, {
      ...this.props.getFetchParams(state),
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (res.status !== 200) {
      alert(`Unknown HTTP response code: ${res.status}`);
    } else {
      this.props.finish(state, res);
    }
  }

  static defaultProps = {
    getFetchParams: (state) => ({
      method: 'POST',
      body: JSON.stringify({
        type: state.dropdownVal,
        id: state.textVal
      })
    }),
    options: []
  };
}

export default GenericBanPanel;