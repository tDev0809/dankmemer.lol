import React, { Component } from 'react';
import Developer from './Developer';
import './DeveloperList.css';

class DeveloperList extends Component {
  render() {
    let mods = [{
      name: 'Donovan',
      picture: 'dono.png',
      hover: 'donovan.gif',
      social: [
        {name: 'GitHub', link: 'https://github.com/DonovanDMC'},
        {name: 'GitLab', link: 'https://gitlab.com/DonovanDMC'},
        {name: 'Twitter', link: 'https://twitter.com/Donovan_DMC'},
        {name: 'world', link: 'https://furry.bot/'}
      ],
      about: "OwO What's This?!?"
    }];
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
      picture: 'melmsie.png',
      hover: 'melmsie.gif',
      about: 'Full stack developer with a love for all things memey and fun.',
      social: [
        {name: 'GitHub', link: 'https://github.com/melmsie'},
        {name: 'GitLab', link: 'https://gitlab.com/daegeiros'},
        {name: 'Twitter', link: 'https://twitter.com/feelsdevman'},
      ]
    },
    {
      name: 'Aetheryx',
      picture: 'aetheryx.png',
      hover: 'snoop.gif',
      about: "Weed weed weed weed space cake weed weed weed weed",
      social: [
        {name: 'GitHub', link: 'https://github.com/aetheryx'}
      ]
    },
    {
      name: 'Paradox',
      picture: 'paradox.png',
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
      name: 'Auxim',
      picture: 'auxim.png',
      hover: 'auxim.gif',
      about: "Meme Grade Pythonker. Devourer of the frikandelbroodje.",
      social: [
        {name: 'GitHub', link: 'https://github.com/GeoffreyWesthoff'},
        {name: 'GitLab', link: 'https://gitlab.com/GeoffreyWesthoff'},
        {name: 'world', link: 'https://altdentifier.com/'}
      ]
    }];
    let list = devs.map(dev => {
      return <Developer key={`dev-${dev.name}`}name={dev.name} about={dev.about} picture={dev.picture} hover={dev.hover} social={dev.social}/>
    })
    let cList = contribs.map(dev => {
      return <Developer key={`dev-${dev.name}`}name={dev.name} about={dev.about} picture={dev.picture} hover={dev.hover} social={dev.social}/>
    })
    let mList = mods.map(dev => {
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
        <h2 className="developer-title">Server Staff</h2>
        <div className="developer-list">
          {mList}
        </div>
      </div>
    )
  }
}

export default DeveloperList;