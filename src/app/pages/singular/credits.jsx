import React from 'react';
import users from './data/users.json';
import Developer from '../../components/developer';
import images from './util/images.js';

const categories = Object.entries(users);
const getSocialIndex = ({ social }) =>
  Object.keys(social).length === 0
    ? -1
    : 1;

    export default class Staff extends React.PureComponent {
      componentDidMount () {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    
      render () {
        return(
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
    <div align="center">
          <ins className="adsbygoogle ad"
            data-ad-client="ca-pub-7326182486296195"
            data-ad-slot="5725651587">
          </ins>
        </div>
  </div>
        );
      }
    }
