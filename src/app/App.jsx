import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

const Home     = lazy(() => import('./Pages/Home'));
const Loot     = lazy(() => import('./Pages/Loot'));
const Blog     = lazy(() => import('./Pages/Blogs/blog.jsx'));
const Rules    = lazy(() => import('./Pages/Rules'));
const Admin    = lazy(() => import('./Pages/Admin'));
const Blogs    = lazy(() => import('./Pages/Blogs'));
const About    = lazy(() => import('./Pages/About'));
const Staff    = lazy(() => import('./Pages/Staff'));
const Terms    = lazy(() => import('./Pages/Terms'));
const Appeals  = lazy(() => import('./Pages/Appeals'));
const Refunds  = lazy(() => import('./Pages/Refunds'));
const Privacy  = lazy(() => import('./Pages/Privacy'));
const Commands = lazy(() => import('./Pages/Commands'));

import NavBar from './Components/NavBar';
import Footer from './Components/Footer';

import './App.css';

export default () => (
  <div className="psuedoBody">
    <NavBar />
    <Switch>
      <Suspense fallback={<div></div>}>
        <Route exact strict component={Home} path="/" />
        <Route component={Commands} path="/commands" />
        <Route component={Staff} path="/staff" />
        <Route component={Loot} path="/loot" />
        <Route component={Rules} path="/rules" />
        <Route component={About} path="/about" />
        <Route component={Blog} path="/blogs/:blog" />
        <Route component={Blogs} path="/blogs/" />
        <Route component={Appeals} path="/appeals/" />
        <Route component={Admin} path="/admin" />
        <Route component={Terms} path="/terms" />
        <Route component={Refunds} path="/refunds" />
        <Route component={Privacy} path="/privacy" />
      </Suspense>
    </Switch>
    <Footer />
  </div>
);