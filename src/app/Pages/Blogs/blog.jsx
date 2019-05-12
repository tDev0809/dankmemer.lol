import React from 'react';
import './blog.css';

export default class Blog extends React.Component {
  state = {
    name: '',
    date: new Date('04/20').getTime(),
    content: ''
  };

  async componentDidMount () {
    this.setState(
      await fetch(`/api/blogs/${this.props.match.params.blog}`)
        .then(r => r.json())
    );
  }

  render () {
    return (
      <>
        <header className="blog-header">
          {this.state.name}
        </header>
        <div className="blog-timestamp">
          {new Date(this.state.date).toLocaleString().split(',')[0]}
        </div>
        {this.state.image && 
          <div className="blog-header-img">
            <img src={this.state.image} />
          </div>}
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{
            __html: this.state.content
          }}
        />
      </>
    );
  }
}