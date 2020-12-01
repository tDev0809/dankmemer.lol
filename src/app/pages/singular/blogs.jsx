import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/button.jsx';

import 'assets/styles/pages/singular/blogs.scss';

export default class Blogs extends React.Component {
  state = {
    blogs: []
  };

  async componentDidMount () {
    this.setState({
      blogs: await fetch('/api/blogs').then(r => r.json())
    });

    (window.adsbygoogle = window.adsbygoogle || []).push({});
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  render () {
    return (
      <div className="content">
        <header className="header">
          <span>Blog Posts</span>
        </header>
        <div align="center">
          <ins className="adsbygoogle ad"
            data-ad-client="ca-pub-7326182486296195"
            data-ad-slot="4551035249">
          </ins>
        </div>
        <div className="list">
          {this.state.blogs.map(blog => (
            <div className="blog-post-container">
              <div className="click-to-read-tag">Click to read</div>
              <Link
                className="boxy"
                key={blog.id}
                to={`/blogs/${blog.id}`}
              >
                <div className="blog-info">
                  <div className="blog-name">
                    {blog.name}
                  </div>
                  <div className="blog-date blurple">
                    Posted {gibbeDatePls(blog.date)} by {blog.author}
                  </div>
                  <span className="blog-desc">
                    {blog.desc}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="call-to-action">
      <span className="action-text">Join the growing Dank Memer family, today.</span>
      <div className="links">
        <Button link="https://invite.dankmemer.lol">
          Add Bot
        </Button>
        <Button link="/commands">
          Commands
        </Button>
      </div>
      <div align="center">
          <ins className="adsbygoogle ad"
            data-ad-client="ca-pub-7326182486296195"
            data-ad-slot="5725651587">
          </ins>
        </div>
    </div>
      </div>
      
    );
  }
}

function gibbeDatePls(date) {
  date = new Date(date);
  const month = date.toLocaleString('default', { month: 'long' });
  const day = getOrdinalNum(date.getDate());
  const year = date.getFullYear()
  return `${month} ${day}, ${year}`;
}

// This function courtesy of SO bc I'm lazy https://stackoverflow.com/a/44418732/7187153
function getOrdinalNum(n) {
  return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
}
