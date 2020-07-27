import React, { Component } from 'react';
import peepoURL from 'assets/peepolove.png';

const directions = [ 0, 90, 180, 270 ];
const peepos = Array(13).fill(0).map((_, i) => new Audio(`/static/peepo${i}.mp3`));
let currentAudio = -1;
const playAudio = () =>
  (peepos[++currentAudio] || peepos[currentAudio = 0])
    .play();

export default class Box extends Component {
  shouldComponentUpdate (newProps, newState) {
    return (
      newProps.isActive !== this.props.isActive
    );
  }

  render () {
    const { box, isActive, setActiveBox, index } = this.props;

    const getPositioning = () => {
      const direction = directions[Math.floor(Math.random() * 4)];
      const x = direction % 180
        ? 200
        : 0;
      const y = direction % 180
        ? 0
        : 90;

      return {
        '--direction': `${direction}deg`,
        '--delta-x': `${direction >= 180 ? -x : x}px`,
        '--delta-y': `${direction >= 180 ? y : -y}px`,
        '--offset-x': direction % 180 ? 0 : `${130 - (Math.random() * 260)}px`,
        '--offset-y': direction % 180 ? `${40 - (Math.random() * 80)}px` : 0
      };
    }

    return (
      <div
        className="box"
        onClick={() => {
          setActiveBox(index);
          playAudio();
        }}
      >
        {this.props.isActive &&
          Array(3).fill(0).map((_, i) => (
            <div
              key={i}
              className="peepo"
              style={{
                ...getPositioning(),
                backgroundImage: `url(${peepoURL})`
              }}
            />
          ))
        }
        <div className={`box-content${isActive ? ' active' : ''}`}>
          <div className="box-header">{box.name}</div>
          <div className="box-description">{box.description}</div>
          <div className="box-yield">
            Amount of coins:
            <span className="box-piss"> {box.yield}</span><br />
            A <u>{box.randomItem.chance * 100}%</u> chance at some <a target="_blank" href="https://gist.github.com/melmsie/022a1b76c6242a59829ea1c4d3af5fec">cool items</a>.
          </div>
          <div className="box-price">${box.price.toFixed(2)}</div>
        </div>
      </div>
    );
  }
}
