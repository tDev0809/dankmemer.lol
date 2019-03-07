import React, { PureComponent } from 'react';
import sleep from '../../util/sleep';

const directions = new Array(4).fill(0).map((_, i) => i * 90);

export default class Box extends PureComponent {
  constructor () {
    super();

    this.state = {
      isPeepoing: false
    };
  }

  peepo () {
    this.setState({ isPeepoing: true }, async () => {
      await sleep(1500);
      this.setState({ isPeepoing: false });
    });
  }

  render () {
    const { box, activeBox, setActiveBox, index } = this.props;

    const getPositioning = () => {
      const direction = directions[Math.floor(Math.random() * 4)];
      const x = direction % 180
        ? 200
        : 0;
      const y = direction % 180
        ? 0
        : 90;

      return {
        [ '--direction' ]: `${direction}deg`,
        [ '--delta-x' ]: `${direction >= 180 ? -x : x}px`,
        [ '--delta-y' ]: `${direction >= 180 ? y : -y}px`,
        [ '--offset-x' ]: direction % 180 ? 0 : `${130 - (Math.random() * 260)}px`,
        [ '--offset-y' ]: direction % 180 ? `${40 - (Math.random() * 80)}px` : 0,
      };
    }

    return (
      <div
        className="box"
        onClick={() => {
          setActiveBox(index);
          this.peepo();
        }}
      >
        {this.state.isPeepoing &&
          Array(3).fill(0).map((_, i) => (
            <div
              key={i}
              className="peepo"
              style={getPositioning()}
            />
          ))
        }
        <div className={`box-content${box.name === activeBox.name ? ' active' : ''}`}>
          <div className="box-header">{box.name}</div>
          <div className="box-description">{box.description}</div>
          <div className="box-yield">
            Amount of coins:
            <span className="box-piss"> {box.yield}</span><br />
            A <u>{box.randomItem.chance * 100}%</u> chance at a <i>{box.randomItem.keyword}-tiered</i> item.
          </div>
          <div className="box-price">${box.price.toFixed(2)}</div>
        </div>
      </div>
    );
  }
}
