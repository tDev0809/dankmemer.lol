import React, { PureComponent } from 'react';
import commands from './commands.json';
import sleep from '../../util/sleep';

import './Commands.scss';

const categoryEmojis = {
  'Animals': 'https://discordapp.com/assets/d8225d4b952c1b5cc325e6e827da212a.svg',
  'Config': 'https://discordapp.com/assets/c61c8e1ffdcbf98496bc098c35f0f694.svg',
  'Currency': 'https://discordapp.com/assets/ccebe0b729ff7530c5e37dbbd9f9938c.svg',
  'Fun': 'https://discordapp.com/assets/f0835a46b501ae0a182874b003fdbb65.svg',
  'Games': 'https://discordapp.com/assets/1adc9faf91526bb7a2c1d0b7b3516cae.svg',
  'Image': 'https://discordapp.com/assets/57aea9031650f92408cb1d43f355fc74.svg',
  'Memey': 'https://discordapp.com/assets/cae9e3b02af6e987442df2953de026fc.svg',
  'Moderation': 'https://discordapp.com/assets/596bd0f8541debff8d44326e840ea085.svg',
  'NSFW': 'https://discordapp.com/assets/1b6c783f128fe9fa93aee4d32a7013d6.svg',
  'Sound': 'https://discordapp.com/assets/fd2173327b6bf2cd86fdcc1dd6d4dee8.svg',
  'Text': 'https://discordapp.com/assets/a61b14400491c0c070e80c99a05cda82.svg',
  'Utility': 'https://discordapp.com/assets/78200fb6296bd2ab02a834120606ae82.svg'
};

export default class Commands extends PureComponent {
  lastTyped = Date.now();
  state = {
    selectedCategory: Object.keys(commands)[0],
    expandedCommand: '',
    transitionState: 'fade-in',
    searchQuery: ''
  };

  setCategory (selectedCategory) {
    if (selectedCategory === this.state.selectedCategory) {
      return;
    }

    this.setState({ transitionState: 'fade-out' }, () =>
      sleep(250).then(() =>
        this.setState({ selectedCategory }, () =>
          this.setState({ transitionState: 'fade-in' })
        )
      )
    );
  }

  componentDidMount () {
    if (window.location.search) {
      window.history.pushState(null, null, 'commands');
    }
  }

  updateSearch (ev) {
    this.lastTyped = Date.now();
    const { value } = ev.target;

    if (value === this.state.searchQuery) {
      return;
    }

    setTimeout(() => {
      const diff = Date.now() - this.lastTyped;
      if (diff > 300 && diff < 400) {
        this.lastTyped = Date.now();
        this.setState({ transitionState: 'fade-out' }, () =>
          sleep(250).then(() =>
            this.setState({ searchQuery: value.toLowerCase() }, () =>
              this.setState({ transitionState: 'fade-in' })
            )
          )
        );
      }
    }, 350)
  }

  render () {
    const { selectedCategory, transitionState, expandedCommand, searchQuery } = this.state;

    return (
      <div className='content commands-page'>
        <div className='commands-wrapper'>
          <div className='categories'>
            {Object.keys(commands)
              .map(category => (
                <div
                  className={`${selectedCategory === category ? 'selected ' : ''}category`}
                  key={category}
                  onClick={() => this.setCategory(category)}
                >
                  <div className='category-img' style={{ background: `url('${categoryEmojis[category]}')` }} />
                  <span>
                    {category}
                  </span>
                </div>
              ))}
          </div>

          <div className='right'>
            <textarea
              placeholder='Search...'
              rows={1}
              className={`${selectedCategory === 'search-bar' ? 'active ' : ''}search-bar`}
              onKeyUp={ev => this.updateSearch(ev)}
              onFocus={() => this.setCategory('search-bar')}
            />
            <div className={`${transitionState} commands`}>
              {(selectedCategory !== 'search-bar'
                ? commands[selectedCategory]
                : Object.values(commands)
                    .flat()
                    .filter(command => (
                      !searchQuery || (
                        command.triggers.some(trigger => trigger.includes(searchQuery)) ||
                        command.description.toLowerCase().includes(searchQuery)
                      )
                    )))
                .map(command => (
                  <div
                    className={`${expandedCommand === command ? 'expanded ' : ''}command`}
                    key={command.triggers[0]}
                    onClick={() => this.setState({
                      expandedCommand: expandedCommand === command ? null : command
                    })}>

                    <div className='command-header blurple'>
                      {command.triggers[0]}
                      <span className='command-header-category'>
                        {selectedCategory === 'search-bar' && (
                          <img src={
                            categoryEmojis[Object.keys(commands).find(category => (
                              commands[category].find(categoryCommand => (
                                categoryCommand.triggers[0] === command.triggers[0]
                              ))
                            ))]
                          }/>
                        )}
                      </span>
                    </div>
                    <div className='command-description'>{command.description.replace(/{command}/g, `pls ${command.triggers[0]}`)}</div>

                    <div className={`${expandedCommand === command ? 'expanded ' : ''}command-expanded-info`}>
                      <div className='command-expanded-seperator' />
                      Usage: {command.usage.replace(/{command}/g, `pls ${command.triggers[0]}`)}<br/>
                      Permissions: {command.perms.join(', ')}<br/>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
