import React, { PureComponent, Fragment } from 'react';
import getUsers from './getUsers.js';
import ReactGA from 'react-ga';
import Developer from './Developers/Developer';

export default class Staff extends PureComponent {
  componentDidMount () {
    ReactGA.pageview('/staff');
  }

  render () {
    const categories = Object.entries(getUsers(mainStore.getState().login));

    return (
      <div className="content">
        {
          categories.map(([ category, users ]) => (
            <React.Fragment key={category}>
              <h2 className="staff-title">{category}</h2>
              <div className="staff-list">
                {users.map(user => (
                  <Developer
                    key={user.name}
                    {...user}
                  />
                ))}
              </div>
            </React.Fragment>
          ))
        }
      </div>
    );
  }
}
