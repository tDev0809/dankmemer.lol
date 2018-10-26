import React, { Component } from 'react';
import Developer from './Developer';
import './DeveloperList.css';

class DeveloperList extends Component {
  render() {
    let devs = [{
      name: 'Blake',
      picture: 'blake.png',
      hover: 'hacker.gif',
      social: [
        {name: 'GitHub', link: 'https://github.com/zBlakee'},
        {name: 'world', link: 'https://zblake.xyz'}
      ],
      about: "G'day, I'm Blake. I'm a web and software developer based in Australia."
    },
    {
      name: 'Melmsie',
      picture: 'melmsie.jpg',
      hover: 'rick.gif',
      about: 'Full stack developer with a love for all things memey and fun.',
      social: [
        {name: 'GitHub', link: 'https://github.com/melmsie'},
        {name: 'Twitter', link: 'https://twitter.com/feelsdevman'},
      ]
    },
    {
      name: 'Paradox',
      picture: 'paradox.jpeg',
      hover: 'france.gif',
      about: 'Baguette tbh',
      social: [
        {name: 'GitHub', link: 'https://github.com/ParadoxOrigins'}
      ]
    }];
    let contribs = [
    {
      name: 'CyberRonin',
      picture: 'cyber.png',
      hover: 'cyber.gif',
      about: 'Maniac who loves programming. I\'m a full stack developer trying to get into UI/UX!',
      social: [
        {name: 'GitHub' ,link: 'https://github.com/TheCyberRonin'},
        {name: 'GitLab', link: 'https://gitlab.com/cyberronin'},
        {name: 'Twitter', link: 'https://twitter.com/thecyberronin'},
      ]
    },
    {
      name: 'Kromatic',
      hover: 'kromatic.gif',
      about: 'Jukebot is better than Rythm, change my mind',
      social: [
        {name: 'GitHub', link: 'https://github.com/Devoxin'},
        {name: 'GitLab', link: 'https://gitlab.com/Devoxin'},
        {name: 'Twitter', link: 'https://twitter.com/Dvoxn'},
        {name: 'world', link: 'https://serux.pro'}
      ],
      picture: 'kromatic.png'
    },
    {
      name: 'Aetheryx',
      picture: 'aetheryx.jpg',
      hover: 'snoop.gif',
      about: "Weed weed weed weed space cake weed weed weed weed",
      social: [
        {name: 'GitHub', link: 'https://github.com/aetheryx'}
      ]
    },
    {
      name: 'Perryprog',
      picture: 'perry.png',
      hover: 'kazoo.gif',
      about: "Hi I'm perry and I do things.",
      social: [
        {name: 'GitHub', link: 'https://github.com/perryprog'},
        {name: 'Twitter', link: 'https://twitter.com/jabbathehutt123'},
        {name: 'world', link: 'http://pprogs.blog'}
      ]
    },
    {
      name: 'Yukine',
      hover: 'yukine.gif',
      picture: 'yukine.png',
      about: 'Hey my name is Yukine and im a hobby developer who loves to try new things out.',
      social: [
        {name: 'GitHub', link: 'https://github.com/Dev-Yukine'}
      ]
    }];
    let list = devs.map(dev => {
      return <Developer key={`dev-${dev.name}`}name={dev.name} about={dev.about} picture={dev.picture} hover={dev.hover} social={dev.social}/>
    })
    let cList = contribs.map(dev => {
      return <Developer key={`dev-${dev.name}`}name={dev.name} about={dev.about} picture={dev.picture} hover={dev.hover} social={dev.social}/>
    })

    return(
      <div>
        <h2 className="developer-title">Developers</h2>
        <div className="developer-list">
          {list}
        </div>
        <h2 className="developer-title">Contributors</h2>
        <div className="developer-list">
          {cList}
        </div>
      </div>
    )
  }
}

export default DeveloperList;