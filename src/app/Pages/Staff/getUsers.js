export default ({ loggedIn, username }) => ({
  'Developers': [{
    name: 'Blake',
    picture: 'blake.png',
    social: [
      { name: 'GitHub', link: 'https://github.com/zBlakee' },
      { name: 'Reddit', link: 'https://www.reddit.com/user/Nevulo' },
      { name: 'Website', link: 'https://zblake.xyz' }
    ],
    about: 'G\'day, I\'m Blake. I\'m a web and software developer based in Australia.'
  }, {
    name: 'Melmsie',
    picture: 'melmsie.gif',
    about: 'Full stack developer with a love for all things memey and fun, Dank Memer is my full time job.',
    social: [
      { name: 'Discord', link: 'https://discord.gg/Wejhbd4' },
      { name: 'GitHub', link: 'https://github.com/melmsie' },
      { name: 'GitLab', link: 'https://gitlab.com/daegeiros' },
      { name: 'Reddit', link: 'https://www.reddit.com/user/Kerdaloo' },
      { name: 'Spotify', link: 'https://open.spotify.com/user/melmsaustin' },
      { name: 'Twitter', link: 'https://twitter.com/feelsdevman' },
      { name: 'Website', link: 'https://codebottle.io/users/melmsie' }
    ]
  }, {
    name: 'Aetheryx',
    picture: 'aetheryx.png',
    about: `Hi ${loggedIn ? username : 'user'}, I'm dad`,
    social: [
      { name: 'Discord', link: 'https://discord.gg/5eSH46g' },
      { name: 'GitHub', link: 'https://github.com/aetheryx' },
      { name: 'Reddit', link: 'https://www.reddit.com/user/Dynamexia' },
      { name: 'Spotify', link: 'https://open.spotify.com/user/Aetheryx' },
      { name: 'Website', link: 'https://powercord.xyz/' }
    ]
  }, {
    name: 'Paradox',
    picture: 'paradox.png',
    about: 'Just a small time baguette, living in a croissant world',
    social: [
      { name: 'GitHub', link: 'https://github.com/ParadoxOrigins' },
      { name: 'Twitter', link: 'https://twitter.com/Paradox_Origins' }
    ]
  }],

  'Contributors': [{
    name: 'CyberRonin',
    picture: 'cyber.gif',
    about: 'Maniac who loves programming. I\'m a full stack developer trying to get into UI/UX!',
    social: [
      { name: 'GitHub', link: 'https://github.com/TheCyberRonin' },
      { name: 'GitLab', link: 'https://gitlab.com/cyberronin' },
      { name: 'Twitter', link: 'https://twitter.com/thecyberronin' },
    ]
  }, {
    name: 'NANI',
    picture: 'nani.gif',
    about: 'Heyo NANI here. I build bots and APIs in Python for a hobby, but most of the time you\'ll find me in a laboratory.',
    social: [
      { name: 'GitHub', link: 'https://github.com/AndyTempel' },
      { name: 'Reddit', link: 'https://www.reddit.com/user/andy_biomed' },
      { name: 'Website', link: 'https://api.ksoft.si/' }
    ]
  }, {
    name: 'Kromatic',
    picture: 'kromatic.gif',
    about: 'Jukebot is better than Rythm, change my mind',
    social: [
      { name: 'GitHub', link: 'https://github.com/Devoxin' },
      { name: 'GitLab', link: 'https://gitlab.com/Devoxin' },
      { name: 'Twitter', link: 'https://twitter.com/Dvoxn' },
      { name: 'Website', link: 'https://serux.pro' }
    ]
  }, {
    name: 'Auxim',
    picture: 'auxim.gif',
    about: 'Meme Grade Pythonker. Devourer of the frikandelbroodje.',
    social: [
      { name: 'GitHub', link: 'https://github.com/GeoffreyWesthoff' },
      { name: 'GitLab', link: 'https://gitlab.com/GeoffreyWesthoff' },
      { name: 'Website', link: 'https://altdentifier.com/' }
    ]
  }],

  'Server Staff': [{
    name: 'Donovan',
    picture: 'donovan.gif',
    social: [
      { name: 'Discord', link: 'https://discord.gg/SuccpZw' },
      { name: 'GitHub', link: 'https://github.com/DonovanDMC' },
      { name: 'GitLab', link: 'https://gitlab.com/DonovanDMC' },
      { name: 'Reddit', link: 'https://www.reddit.com/user/Donovan_DMC' },
      { name: 'Twitter', link: 'https://twitter.com/Donovan_DMC' },
      { name: 'Website', link: 'https://furry.bot/' }
    ],
    about: "OwO What's This?!?"
  }, {
    name: 'Nyx',
    picture: 'nyx.png',
    social: [
      { name: 'Reddit', link: 'https://www.reddit.com/user/Nyxgawr' },
      { name: 'Spotify', link: 'https://open.spotify.com/user/slashnyx/playlist/5aQkSFEXjGwzBJuFutQyGV?si=uWJc5io0TtC2x3_qufttew' },
      { name: 'Twitter', link: 'https://twitter.com/Nyxgawr' }
    ],
    about: "Night Shift Security Boi"
  }, {
    name: 'Fizzy Coco',
    picture: 'fizzy.png',
    social: [
      { name: 'Reddit', link: 'https://www.reddit.com/u/rlcrawkm/' },
      { name: 'Website', link: 'https://m.youtube.com/watch?v=dQw4w9WgXcQ' }
    ],
    about: "Imagine having a bio in 2019"
  }, {
    name: 'Sinister™',
    picture: 'sinister.png',
    social: [
      { name: 'Website', link: 'https://www.youtube.com/watch?v=o1eHKf-dMwo' }
    ],
    about: "I help meth-heads change their light bulbs"
  }, {
    name: 'Dank Spider-Mod',
    picture: 'spider.png',
    about: 'It\'s your friendly serverhood Spider-Mod!',
    social: [
      { name: 'GitHub', link: 'https://github.com/Zorukia' },
      { name: 'Reddit', link: 'https://www.reddit.com/user/Zorukia' },
      { name: 'Twitter', link: 'https://twitter.com/MDDQ2' }
    ]
  }, {
    name: 'Mook',
    picture: 'mook.png',
    about: 'Is this my peak?',
    social: [
      { name: 'Discord', link: 'https://discord.gg/HdQYu6U' },
      { name: 'Twitter', link: 'https://twitter.com/B_A_Services' }
    ]
  }, {
    name: 'Dauntless',
    picture: 'daunt.png',
    about: 'Hi, I like coding stuff / Comp Sci student',
    social: [
      { name: 'Discord', link: 'https://discord.gg/FjBbCxC' },
      { name: 'GitHub', link: 'https://github.com/Dauntless7' },
      { name: 'Reddit', link: 'https://www.reddit.com/user/lonesomefickle' },
      { name: 'Twitter', link: 'https://twitter.com/nicolai5423' }
    ]
  }, {
    name: 'Alpha',
    picture: 'alpha.gif',
    about: 'uhh ok so i like to do stuff then sleep. JS coder and student.',
    social: [
      { name: 'Discord', link: 'https://discord.gg/tsarFKm' },
      { name: 'GitHub', link: 'https://github.com/LordAlpha27' },
      { name: 'GitLab', link: 'https://gitlab.com/LordAlpha27' },
      { name: 'Reddit', link: 'https://reddit.com/u/LordAlpha27' },
      { name: 'Twitter', link: 'https://twitter.com/LordAlpha27' },
      { name: 'Website', link: 'https://alphapack.xyz/' }
    ]
  }]
});