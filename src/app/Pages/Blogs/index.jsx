import React, { PureComponent } from 'react';
import ReactGA from 'react-ga';

import './blogs.css';

export default class Blogs extends PureComponent {
  constructor () {
    super();

    this.state = {
      blogs: []
    };
  }

  async componentDidMount () {
    ReactGA.pageview('/blogs');

    this.setState({
      blogs: await fetch('/api/blogs').then(r => r.json())
    });
  }

  render () {
    return (
      <div className="content">
        <header className="header">
          Blogs
        </header>
        <div className="blogs">
          {this.state.blogs.map(blog => (
            <a
              className="blog"
              key={blog.id}
              href={`/blogs/${blog.id}`}
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
            </a>
          ))}
        </div>
      </div>
    );
  }
}