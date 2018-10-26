import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './Pages/Home/Home';
import Commands from './Pages/Commands/Commands';
import About from './Pages/Devs/Devs';
import NavBar from './NavBar/NavBar';
import Footer from './Footer/Footer';
import './App.css';

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
          </Switch>
        <Footer />
    </div>
    );
  }
}

export default App;