import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home     from './Pages/Home';
import Loot     from './Pages/Loot';
import Rules    from './Pages/Rules';
import Admin    from './Pages/Admin';
import About    from './Pages/About';
import Staff    from './Pages/Staff';
import Terms    from './Pages/Terms';
import NavBar   from './Components/NavBar';
import Footer   from './Components/Footer';
import Refunds  from './Pages/Refunds';
import Privacy  from './Pages/Privacy';
import Commands from './Pages/Commands';

import './App.css';

export default () => (
  <div className="psuedoBody">
    <NavBar />
    <Switch>
      <Route exact strict component={Home} path="/" />
      <Route component={Commands} path="/commands" />
      <Route component={Staff} path="/staff" />
      <Route component={Loot} path="/loot" />
      <Route component={Rules} path="/rules" />
      <Route component={About} path="/about" />
      {/* <Route component={Admin} path="/admin" /> */}
      <Route component={Terms} path="/terms" />
      <Route component={Refunds} path="/refunds" />
      <Route component={Privacy} path="/privacy" />
    </Switch>
    <Footer />
  </div>
);