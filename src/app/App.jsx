import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

const Home     = lazy(() => import('./pages/singular/home'));
const Loot     = lazy(() => import('./pages/store/lootboxes'));
const Rules    = lazy(() => import('./pages/rules/rules'));
const Admin    = lazy(() => import('./pages/admin/admin'));
const Blog     = lazy(() => import('./components/blog'));
const Blogs    = lazy(() => import('./pages/singular/blogs'));
const About    = lazy(() => import('./pages/singular/about'));
const Staff    = lazy(() => import('./pages/singular/credits'));
const Terms    = lazy(() => import('./pages/legal/terms'));
const Landing  = lazy(() => import('./pages/singular/landing'));
const Appeals  = lazy(() => import('./pages/rules/appeals'));
const Reports  = lazy(() => import('./pages/rules/reports'));
const Refunds  = lazy(() => import('./pages/store/refunds'));
const Privacy  = lazy(() => import('./pages/legal/privacy'));
const Commands = lazy(() => import('./pages/info/Commands'));
const Faq      = lazy(() => import('./pages/info/Faq'));

import NavBar from './components/navbar.jsx';
import Footer from './components/footer.jsx';

import './assets/styles/misc/main.scss';

export default () => {
  ga('send', 'pageview', {
    hitType: 'pageview',
    page: location.pathname
  });

  return (
    <>
      <div className="psuedoBody">
        <NavBar />
        <Switch>
          <Suspense fallback={<div></div>}>
            <Route exact strict component={() => <Home />} path="/" />
            <Route component={() => <Commands />} path="/commands" />
            <Route component={() => <Faq />} path="/faq" />
            <Route component={() => <Staff />} path="/staff" />
            <Route component={() => <Loot />} path="/loot" />
            <Route component={() => <Rules />} path="/rules" />
            <Route component={() => <About />} path="/about" />
            <Route exact component={() => <Blogs />} path="/blogs" />
            <Route exact component={(props) => <Blog {...props} />} path="/blogs/:blog" />
            <Route component={() => <Appeals />} path="/appeals/" />
            <Route component={() => <Reports />} path="/reports/" />
            <Route component={() => <Admin />} path="/admin" />
            <Route component={() => <Terms />} path="/terms" />
            <Route component={() => <Landing />} path="/landing" />
            <Route component={() => <Refunds />} path="/refunds" />
            <Route component={() => <Privacy />} path="/privacy" />
          </Suspense>
        </Switch>
      </div>
      <Footer />
      <div id='modals' />
    </>
  );
}