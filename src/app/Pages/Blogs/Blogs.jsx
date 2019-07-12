import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import './blogs.css';

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
          <span className="blurple">BLOGS</span>
        </header>
        <div className="blogs">
          {this.state.blogs.map(blog => (
            <Link
              className="blog"
              key={blog.id}
              to={`/blogs/${blog.id}`}
            >
              {blog.thumbnail &&
                <div className="blog-img">
                  <img src={blog.thumbnail} />
                </div>}
              <div className="blog-info">
                <div className="blog-name">
                  {blog.name}
                </div>
                <div className="blog-date">
                  {new Date(blog.date).toLocaleString().split(',')[0]}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }
}
