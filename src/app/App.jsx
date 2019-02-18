import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './Pages/Home/Home';
import Commands from './Pages/Commands/Commands';
import About from './Pages/Devs/Devs';
import Loot from './Pages/Loot/Loot.jsx';
import Rules from './Pages/Rules/Rules';
import Admin from './Pages/Admin/Admin';
import Terms from './Pages/Terms/Terms';
import Refunds from './Pages/Refunds/Refunds';
import Privacy from './Pages/Privacy/Privacy';
import NavBar from './NavBar/NavBar';
import Footer from './Footer/Footer';
import './App.css';

const sleep = (t) => new Promise(r => setTimeout(r, t));

class App extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="psuedoBody">
        <NavBar />
          <Switch>
            <Route exact strict component={Home} path="/" />
            <Route component={Commands} path="/commands" />
            <Route component={About} path="/devs" />
            <Route component={Loot} path="/loot" />
            <Route component={Rules} path="/rules" />
            <Route component={Admin} path="/admin" />
            <Route component={Terms} path="/terms" />
            <Route component={Refunds} path="/refunds" />
            <Route component={Privacy} path="/privacy" />
          </Switch>
        <Footer />
      </div>
    );
  }
}

const renderFrame = (getDelta = () => 0) =>
  Object.assign(document.body.style, {
    top: getDelta('top'),
    left: getDelta('left'),
    right: getDelta('right'),
    bottom: getDelta('bottom')
  });

// todo: make not ugly
const d = document.createElement('div');
d.id = 'ree-overlay';
document.body.appendChild(d);

window.reeCount = 0;
window.ree = async function ({ duration = 500, heavyness = 10, playAudio = true, rage = true }) {
  window.reeCount++;
  const interval = setInterval(() =>
    renderFrame(() => `${Math.random() * heavyness}px`)
  );

  if (rage) {
    d.className = 'reeing';
  }

  setTimeout(() => {
    clearInterval(interval);
    renderFrame(() => 0);
    window.reeCount--;
    if (window.reeCount === 0) {
      d.className = '';
    }
  }, duration);

  if (playAudio) {
    const audio = new Audio('/reeee.mp3');
    audio.volume = 0.5;
    audio.play();

    const steps = audio.volume / 0.001;
    const timePerStep = duration / steps;
    while (audio.volume > 0.001) {
      await sleep(timePerStep);
      audio.volume -= 0.001;
    }
    audio.volume = 0;
  }

  return interval;
}
window.ree.renderFrame = renderFrame;

export default App;