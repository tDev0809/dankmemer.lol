import React, { PureComponent } from 'react';
import commands from './commands.json';
import sleep from '../../util/sleep';
import twemoji from './twemoji';

import './Commands.scss';
if (window !== window.parent) {
  delete commands.NSFW;
}

export default class Commands extends PureComponent {
  commandsRef = React.createRef();
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
                  <div className='category-img' style={{ background: `url('${twemoji[category]}')` }} />
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
            <div className={`${transitionState} commands`} ref={this.commandsRef}>
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
                      {(command.premiumServer || command.donorOnly) && (
                        <img
                          className='premium-star'
                          title={command.premiumServer ? 'Premium Server Command' : 'Donor Command'}
                          src={twemoji.Star}
                        />
                      )}

                      <span className='command-header-category'>
                        {selectedCategory === 'search-bar' && (
                          <img src={
                            twemoji[Object.keys(commands).find(category => (
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
