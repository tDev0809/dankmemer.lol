import React from 'react';
import getUsers from './getUsers.js';
import Developer from './Developers/Developer';

const categories = Object.entries(getUsers(mainStore.getState().login));

export default React.memo(() => (
  <div className="content">
    {categories.map(([ category, users ]) => (
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
    ))}
  </div>
));
