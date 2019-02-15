import React, { Component } from 'react';
import { connect } from 'react-redux';
import Developer from './Developer';
import './DeveloperList.css';

class DeveloperList extends Component {
  render() {
    let mods = [{
      name: 'Donovan',
      picture: 'dono.png',
      hover: 'dono.png',
      social: [
        {name: 'Discord', link: 'https://discord.gg/SuccpZw'},
        {name: 'GitHub', link: 'https://github.com/DonovanDMC'},
        {name: 'GitLab', link: 'https://gitlab.com/DonovanDMC'},
        {name: 'Reddit', link: 'https://www.reddit.com/user/Donovan_DMC'},
        {name: 'Twitter', link: 'https://twitter.com/Donovan_DMC'},
        {name: 'Website', link: 'https://furry.bot/'}
      ],
      about: "OwO What's This?!?"
    },
    {
      name: 'Nyx',
      picture: 'nyx.png',
      hover: 'nyx.png',
      social: [
        {name: 'Reddit', link: 'https://www.reddit.com/user/Nyxgawr'},
        {name: 'Spotify', link: 'https://open.spotify.com/user/slashnyx/playlist/5aQkSFEXjGwzBJuFutQyGV?si=uWJc5io0TtC2x3_qufttew'},
        {name: 'Twitter', link: 'https://twitter.com/Nyxgawr'}
      ],
      about: "Night Shift Security Boi"
    }, {
      name: 'NateTheCarrot',
      picture: 'nate.png',
      hover: 'nate.png',
      social: [
        {name: 'Discord', link: 'https://discord.gg/gz6vvXU'},
        {name: 'GitHub', link: 'https://github.com/NateTheCarrot'},
        {name: 'GitLab', link: 'https://gitlab.com/NateTheCarrot'},
        {name: 'Reddit', link: 'https://reddit.com/u/NateTheCarrot'},
        {name: 'Twitter', link: 'https://twitter.com/NateTheCarrot'},
        {name: 'Website', link: 'https://website--iamnatej.repl.co/'}
      ],
      about: "Moderate Python and JS programmer, chairs are friends not food"
    },
    {
      name: 'Sinister™',
      picture: 'sinister.png',
      hover: 'sinister.png',
      social: [
        {name: 'Website', link: 'https://www.youtube.com/watch?v=o1eHKf-dMwo'}
      ],
      about: "I help meth-heads change their light bulbs"
    },
    {
      name: 'Dank Spider-Mod',
      picture: 'spider.png',
      hover: 'spider.png',
      about: 'It\'s your friendly serverhood Spider-Mod!',
      social: [
        {name: 'GitHub', link: 'https://github.com/Zorukia'},
        {name: 'Reddit', link: 'https://www.reddit.com/user/Zorukia'},
        {name: 'Twitter', link: 'https://twitter.com/MDDQ2'}
      ]
    },
    {
      name: 'Mook',
      picture: 'mook.png',
      hover: 'mook.png',
      about: 'ok ok ok ok ok x10',
      social: [
        {name: 'Discord', link: 'https://discord.gg/HdQYu6U'},
        {name: 'Twitter', link: 'https://twitter.com/B_A_Services'}
      ]
    },
    {
      name: 'Dauntless',
      picture: 'daunt.png',
      hover: 'daunt.png',
      about: 'Hi, I like coding stuff / Comp Sci student',
      social: [
        {name: 'Discord', link: 'https://discord.gg/FjBbCxC'},
        {name: 'GitHub', link: 'https://github.com/Dauntless7'},
        {name: 'Reddit', link: 'https://www.reddit.com/user/lonesomefickle'},
        {name: 'Twitter', link: 'https://twitter.com/nicolai5423'}
      ]
    },
    {
      name: 'Alpha',
      picture: 'alpha.png',
      hover: 'alpha.png',
      about: 'My personality type is Dwight Schrute of Schrute Farms, and Melmsie is cooler than me',
      social: [
        {name: 'Discord', link: 'https://discord.gg/Wejhbd4'},
        {name: 'GitHub', link: 'https://github.com/melmsie'},
        {name: 'GitLab', link: 'https://gitlab.com/daegeiros'},
        {name: 'Reddit', link: 'https://www.reddit.com/user/Kerdaloo'},
        {name: 'Spotify', link: 'https://open.spotify.com/user/melmsaustin'},
        {name: 'Twitter', link: 'https://twitter.com/feelsdevman'},
        {name: 'Website', link: 'https://drama.lol'}
      ]
    }];
    let devs = [{
      name: 'Blake',
      picture: 'blake.png',
      hover: 'hacker.gif',
      social: [
        {name: 'GitHub', link: 'https://github.com/zBlakee'},
        {name: 'Reddit', link: 'https://www.reddit.com/user/Nevulo'},
        {name: 'Website', link: 'https://zblake.xyz'}
      ],
      about: "G'day, I'm Blake. I'm a web and software developer based in Australia."
    },
    {
      name: 'Melmsie',
      picture: 'melmsie.png',
      hover: 'melmsie.gif',
      about: 'Full stack developer with a love for all things memey and fun, Dank Memer is my full time job.',
      social: [
        {name: 'Discord', link: 'https://discord.gg/Wejhbd4'},
        {name: 'GitHub', link: 'https://github.com/melmsie'},
        {name: 'GitLab', link: 'https://gitlab.com/daegeiros'},
        {name: 'Reddit', link: 'https://www.reddit.com/user/Kerdaloo'},
        {name: 'Spotify', link: 'https://open.spotify.com/user/melmsaustin'},
        {name: 'Twitter', link: 'https://twitter.com/feelsdevman'},
        {name: 'Website', link: 'https://codebottle.io/users/melmsie'}
      ]
    },
    {
      name: 'Aetheryx',
      picture: 'aetheryx.png',
      hover: 'snoop.gif',
      about: `Hi ${this.props.loggedIn ? this.props.username : 'user'}, I'm dad`,
      social: [
        {name: 'Discord', link: 'https://discord.gg/5eSH46g'},
        {name: 'GitHub', link: 'https://github.com/aetheryx'},
        {name: 'Reddit', link: 'https://www.reddit.com/user/Dynamexia'},
        {name: 'Spotify', link: 'https://open.spotify.com/user/Aetheryx'},
        {name: 'Website', link: 'https://powercord.xyz/'}
      ]
    },
    {
      name: 'Paradox',
      picture: 'paradox.png',
      hover: 'france.gif',
      about: 'Just a small time baguette, living in a croissant world',

      social: [
        {name: 'GitHub', link: 'https://github.com/ParadoxOrigins'},
        {name: 'Twitter', link: 'https://twitter.com/Paradox_Origins'}
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
      name: 'NANI',
      picture: 'nani.png',
      hover: 'nani.gif',
      about: 'Heyo NANI here. I build bots and APIs in python for a hobby, but most of the time you\'ll find me in a laboratory.',
      social: [
        {name: 'GitHub' ,link: 'https://github.com/AndyTempel'},
        {name: 'Reddit', link: 'https://www.reddit.com/user/andy_biomed'},
        {name: 'Website', link: 'https://api.ksoft.si/'}
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
        {name: 'Website', link: 'https://serux.pro'}
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
        {name: 'Website', link: 'https://altdentifier.com/'}
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

export default connect(store => store.login)(DeveloperList);