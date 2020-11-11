import React from 'react';
import './blog.css';
import Button from '../../Components/Button/index.jsx';

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
        <div className="blog-header-container">
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
        </div>
        <ins className="adsbygoogle"
          style={{display:'block'}}
          data-ad-client="ca-pub-7326182486296195"
          data-ad-slot="4551035249"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{
            __html: this.state.content
          }}
        />
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
    </div>
    <ins className="adsbygoogle"
          style={{display:'block'}}
          data-ad-client="ca-pub-7326182486296195"
          data-ad-slot="4551035249"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
      </>
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