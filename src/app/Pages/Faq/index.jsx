import React, { PureComponent } from 'react';
import commands from './faq.json';
import sleep from '../../util/sleep';

import './Commands.scss';

export default class FAQ extends PureComponent {
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
    (window.adsbygoogle = window.adsbygoogle || []).push({});
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
      <>
      <ins className="adsbygoogle ad"
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
                        command.q.toLowerCase().includes(searchQuery) ||
                        command.a.toLowerCase().includes(searchQuery)
                      )
                    )))
                .map(command => (
                  <div
                    className={`${expandedCommand === command ? 'expanded ' : ''}command`}
                    key={command.q}
                    onClick={() => this.setState({
                      expandedCommand: expandedCommand === command ? null : command
                    })}>

                    <div className='command-header blurple'>
                      <div className='command-name'>{command.q}</div>

                    </div>
                    <div className={`${expandedCommand === command ? 'expanded ' : ''}command-expanded-info`}>
                      <div className='command-expanded-seperator' />
                      <div className='command-info-section'>
                        <div className='command-info-header'>Answer</div>
                        <div className='command-info-details command-info-permissions'>{command.a}</div>
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
      <ins className="adsbygoogle ad"
          data-ad-client="ca-pub-7326182486296195"
          data-ad-slot="4551035249"
          data-ad-format="auto"
          data-full-width-responsive="true"></ins>
      </>
    );
  }
}
