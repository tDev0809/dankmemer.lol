import React, { Component } from 'react';
import Developer from './Developer';
import './DeveloperList.css';

class DeveloperList extends Component {
  render() {
    let devs = [{
      name: 'Blake',
      picture: 'blake.png',
      social: [
        {name: 'GitHub', link: 'https://github.com/zBlakee'},
        {name: 'world', link: 'https://zblake.xyz'}
      ],
      about: "G'day, I'm Blake. I'm a web and software developer based in Australia."
    },
    {
      name: 'CyberRonin',
      picture: 'cyber.png',
      about: 'Maniac who loves programming. I\'m a fullstack developer trying to get into UI/UX!',
      social: [
        {name: 'GitHub' ,link: 'https://github.com/TheCyberRonin'},
        {name: 'GitLab', link: 'https://gitlab.com/cyberronin'},
        {name: 'Twitter', link: 'https://twitter.com/thecyberronin'},
      ]
    },
    {
      name: 'Kromatic',
      social: [
        {name: 'GitHub', link: 'https://github.com/Devoxin'},
        {name: 'GitLab', link: 'https://gitlab.com/Devoxin'},
        {name: 'Twitter', link: 'https://twitter.com/Dvoxn'},
        {name: 'world', link: 'https://serux.pro'}
      ],
      picture: 'kromatic.png'
    },
    {
      name: 'Melmsie',
      picture: 'yeet.png',
      about: 'Full stack developer with a love for all things memey and fun.',
      social: [
        {name: 'GitHub', link: 'https://github.com/melmsie'},
        {name: 'Twitter', link: 'https://twitter.com/feelsdevman'},
      ]
    },
    {
      name: 'Paradox',
      picture: 'paradox.jpeg',
      about: 'Something something about a paradox',
      social: [
        {name: 'GitHub', link: 'https://github.com/ParadoxOrigins'}
      ]
    },
    {
      name: 'Perryprog',
      picture: 'perry.jpg',
      social: [
        {name: 'GitHub', link: 'https://github.com/perryprog'},
        {name: 'Twitter', link: 'https://twitter.com/jabbathehutt123'},
        {name: 'world', link: 'http://pprogs.blog'}
      ]
    },
    {
      name: 'Yukine',
      picture: 'yukine.png',
      about: 'Hey my name is Yukine and im a hobby developer who loves to try new things out.',
      social: [
        {name: 'GitHub', link: 'https://github.com/Dev-Yukine'}
      ]
    }];
    let list = devs.map(dev => {
      return <Developer key={`dev-${dev.name}`}name={dev.name} about={dev.about} picture={dev.picture} social={dev.social}/>
    })

    return(
      <div>
        <h2 className="developer-title">Developers</h2>
        <div className="developer-list">
          {list}
        </div>
      </div>
    )
  }
}

export default DeveloperList;