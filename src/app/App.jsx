import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/singular/home';
import Loot from './pages/store/lootboxes';
import Rules from './pages/rules/rules';
import Admin from './pages/admin/admin';
import Blog from './components/blog';
import Blogs from './pages/singular/blogs';
import About from './pages/singular/about';
import Staff from './pages/singular/credits';
import Terms from './pages/legal/terms';
import Landing from './pages/singular/landing';
import Appeals from './pages/rules/appeals';
import Reports from './pages/rules/reports';
import Refunds from './pages/store/refunds';
import Privacy from './pages/legal/privacy';
import Commands from './pages/info/commands';
import Faq from './pages/info/faq';
import NotFound from './pages/singular/notfound';

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
			<div id="pseudoBody">
				<NavBar />
				<Switch>
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
					
					{/* Route below must be at bottom for the 404 page to only show when no other route is found */}
					<Route component={() => <NotFound />} path="*" />
				</Switch>
			</div>
			<Footer />
			<div id='modals' />
		</>
	);
}