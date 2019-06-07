import React from 'react';
import getUsers from './getUsers.js';
import Developer from './Developers/Developer';
import images from './images.js';

const categories = Object.entries(getUsers(mainStore.getState().login));
const getSocialIndex = ({ social }) =>
  Object.keys(social).length === 0
    ? -1
    : 1;

export default React.memo(() => (
  <div className="content">
    {categories.map(([ category, users ]) => (
      <React.Fragment key={category}>
        <h2 className="staff-title">{category}</h2>
        <div className="staff-list">
          {users
            .sort(() => Math.random() - 0.5)
            .sort((a, b) => getSocialIndex(a) - getSocialIndex(b))
            .map(user => (
              <Developer
                {...user}
                key={user.name}
                picture={images[user.name.toLowerCase().replace(/ /g, '-')]}
              />
            ))}
        </div>
      </React.Fragment>
    ))}
  </div>
));
