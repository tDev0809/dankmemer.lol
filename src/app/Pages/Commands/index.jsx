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
      <div>
        <ins class="adsbygoogle"
          style="display:block"
          data-ad-client="ca-pub-7326182486296195"
          data-ad-slot="4551035249"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
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
                spellCheck={false}
                className={`${selectedCategory === 'search-bar' ? 'active ' : ''}search-bar`}
                onKeyUp={ev => this.updateSearch(ev)}
                onFocus={() => this.setCategory('search-bar')}
              />
              <div className={`${transitionState} commands`} ref={this.commandsRef}>
                <div className='commands-scroller'>
                {(selectedCategory !== 'search-bar'
                  ? commands[selectedCategory]
                  : Object.values(commands)
                      .flat()
                      .filter(command => (
                        !searchQuery || (
                          command.t.some(trigger => trigger.includes(searchQuery)) ||
                          command.d.toLowerCase().includes(searchQuery)
                        )
                      )))
                  .map(command => (
                    <div
                      className={`${expandedCommand === command ? 'expanded ' : ''}command`}
                      key={command.t[0]}
                      onClick={() => this.setState({
                        expandedCommand: expandedCommand === command ? null : command
                      })}>

                      <div className='command-header blurple'>
                        <div className='command-name'>{command.t[0]}</div>
                        {(command.pS || command.dO) && (
                          <img
                            className='premium-star'
                            title={command.pS ? 'Premium Server Command' : 'Donor Command'}
                            src={twemoji.Star}
                          />
                        )}

                        <span className='command-header-category'>
                          {selectedCategory === 'search-bar' && (
                            <img src={
                              twemoji[Object.keys(commands).find(category => (
                                commands[category].find(categoryCommand => (
                                  categoryCommand.t[0] === command.t[0]
                                ))
                              ))]
                            }/>
                          )}
                        </span>
                      </div>
                      <div className='command-description'>
                        {command.d.replace(/{command}/g, `pls ${command.t[0]}`)}
                      </div>

                      <div className={`${expandedCommand === command ? 'expanded ' : ''}command-expanded-info`}>
                        <div className='command-expanded-seperator' />
                        <div className='command-info-section'>
                          <div className='command-info-header'>Usage</div>
                          <div className='command-info-details command-info-usage'>
                            <div className='command-info-usage-prefix'>pls</div>
                            <div className='command-info-usage-command'>{command.u.replace(/{command}/g, `${command.t[0]}`).replace('pls', '').split(' ')[1]}</div>
                            <div className='command-info-usage-arguments'>{command.u.replace(/{command}/g, `${command.t[0]}`).replace('pls', '').split(' ')[2] || ''}</div>
                          </div>

                          <div className='command-info-header'>Permissions</div>
                          <div className='command-info-details command-info-permissions'>
                            {
                              command.p
                                .map(permission => {
                                  const chars = permission.split('');
                                  const uppercaseIdx = chars.findIndex(c => c === c.toUpperCase());
                                  chars.splice(uppercaseIdx, 0, ' ');
                                  return chars[0].toUpperCase() + chars.slice(1).join('');
                                })
                                .join(', ')
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className='commands-shadow'></div>
              </div>
            </div>
          </div>
        </div>
        <ins class="adsbygoogle"
          style="display:block"
          data-ad-client="ca-pub-7326182486296195"
          data-ad-slot="4551035249"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
      </div>
    );
  }
}
