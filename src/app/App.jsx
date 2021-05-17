import React, { lazy } from 'react';
import NormalRoute from './util/routers/NormalRoute';
import ControlRoute from './util/routers/ControlRoute';
import { Switch } from 'react-router-dom';

const Home     = lazy(() => import('./pages/singular/home'));
const Loot     = lazy(() => import('./pages/store/lootboxes'));
const Rules    = lazy(() => import('./pages/rules/rules'));
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

import './assets/styles/misc/main.scss';

export default () => {
  	ga('send', 'pageview', {
    	hitType: 'pageview',
    	page: location.pathname
  	});

  	return (
		<>
			<Switch>
				<NormalRoute exact strict path="/" component={<Home />} path="/" />
				<NormalRoute path="/commands" component={<Commands />} />
				<NormalRoute path="/faq" component={<Faq />} />
				<NormalRoute path="/staff" component={<Staff />} />
				<NormalRoute path="/loot" component={<Loot />}/>
				<NormalRoute path="/rules" component={<Rules />} />
				<NormalRoute path="/about" component={<About />}/>
				<NormalRoute exact path="/blogs" component={<Blogs />} />
				<NormalRoute exact path="/blogs/:blog" component={<Blog/>} />
				<NormalRoute path="/appeals/" component={<Appeals />} />
				<NormalRoute path="/reports/" component={<Reports />} />
				<NormalRoute path="/terms" component={<Terms />} />
				<NormalRoute path="/landing" component={<Landing />} />
				<NormalRoute path="/refunds" component={<Refunds />} />
				<NormalRoute path="/privacy" component={<Privacy />} />

				<ControlRoute exact path={["/control", "/control/admin", "/control/mods"]} view="none:determine" />
				<ControlRoute path="/control/admin/access" view="admin:access" />
				<ControlRoute path="/control/admin/users" view="admin:users" />
				<ControlRoute path="/control/admin/website" view="admin:website" />
				<ControlRoute path="/control/admin/blogs" view="admin:blogs" />
				<ControlRoute path="/control/mods/inspect" view="mods:inspect" />
				<ControlRoute path="/control/mods/analytics" view="mods:analytics" />
				<ControlRoute path="/control/personalize/card" view="personalize:card" />
				
				{/* Route below must be at bottom for the 404 page to only show when no other route is found */}
				<NormalRoute path="*" component={<NotFound />} />
			</Switch>
			<div id='modals' />
		</>
	);
}