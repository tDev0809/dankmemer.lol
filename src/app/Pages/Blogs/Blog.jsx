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
        <header className="blog-header blurple">
          {this.state.name}
        </header>
        <div className="blog-timestamp">
          Posted {gibbeDatePls(this.state.date)} by {this.state.author}
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