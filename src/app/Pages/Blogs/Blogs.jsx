import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import './blogs.scss';

export default class Blogs extends React.Component {
  state = {
    blogs: []
  };

  async componentDidMount () {
    this.setState({
      blogs: await fetch('/api/blogs').then(r => r.json())
    });
  }

  render () {
    return (
      <div className="content">
        <header className="header">
          <span>BLOGS</span>
        </header>
        <div className="list">
          {this.state.blogs.map(blog => (
            <Link
              className="boxy"
              key={blog.id}
              to={`/blogs/${blog.id}`}
            >
              <div className="blog-info">
                <div className="blog-name blurple">
                  {blog.name}
                </div>
                <div className="blog-date">
                  Posted {gibbeDatePls(blog.date)} by {blog.author}
                </div>
                <span className="blog-desc">
                  {blog.desc}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}

function gibbeDatePls(date) {
  date = new Date(date);
  const month = date.toLocaleString('default', { month: 'long' });
  const day = getOrdinalNum(date.getDate());
  return `${month} ${day}`;
}

// This function courtesy of SO bc I'm lazy https://stackoverflow.com/a/44418732/7187153
function getOrdinalNum(n) {
  return n + (n > 0 ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10] : '');
}
