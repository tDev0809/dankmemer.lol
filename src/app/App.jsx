import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

const Home     = lazy(() => import('./pages/singular/home'));
const Loot     = lazy(() => import('./pages/store/lootboxes'));
const Rules    = lazy(() => import('./pages/rules/rules'));
const Admin    = lazy(() => import('./pages/control/admin'));
const Mods     = lazy(() => import('./pages/control/mods'));
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
const Commands = lazy(() => import('./pages/info/commands'));
const Faq      = lazy(() => import('./pages/info/faq'));
const NotFound = lazy(() => import('./pages/singular/notfound'));

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
					<Route exact strict component={() => <Suspense fallback={<div></div>}><Home /></Suspense>} path="/" />
					<Route component={() => <Suspense fallback={<div></div>}><Commands /></Suspense>} path="/commands" />
					<Route component={() => <Suspense fallback={<div></div>}><Faq /></Suspense>} path="/faq" />
					<Route component={() => <Suspense fallback={<div></div>}><Staff /></Suspense>} path="/staff" />
					<Route component={() => <Suspense fallback={<div></div>}><Loot /></Suspense>} path="/loot" />
					<Route component={() => <Suspense fallback={<div></div>}><Rules /></Suspense>} path="/rules" />
					<Route component={() => <Suspense fallback={<div></div>}><About /></Suspense>} path="/about" />
					<Route exact component={() => <Suspense fallback={<div></div>}><Blogs /></Suspense>} path="/blogs" />
					<Route exact component={(props) => <Suspense fallback={<div></div>}><Blog {...props} /></Suspense>} path="/blogs/:blog" />
					<Route component={() => <Suspense fallback={<div></div>}><Appeals /></Suspense>} path="/appeals/" />
					<Route component={() => <Suspense fallback={<div></div>}><Reports /></Suspense>} path="/reports/" />
					<Route component={() => <Suspense fallback={<div></div>}><Admin /></Suspense>} path="/admin" />
					<Route component={() => <Suspense fallback={<div></div>}><Mods /></Suspense>} path="/mods" />
					<Route component={() => <Suspense fallback={<div></div>}><Terms /></Suspense>} path="/terms" />
					<Route component={() => <Suspense fallback={<div></div>}><Landing /></Suspense>} path="/landing" />
					<Route component={() => <Suspense fallback={<div></div>}><Refunds /></Suspense>} path="/refunds" />
					<Route component={() => <Suspense fallback={<div></div>}><Privacy /></Suspense>} path="/privacy" />
					
					{/* Route below must be at bottom for the 404 page to only show when no other route is found */}
					<Route component={() => <Suspense fallback={<div></div>}><NotFound /></Suspense>} path="*" />
				</Switch>
			</div>
			<Footer />
			<div id='modals' />
		</>
	);
}