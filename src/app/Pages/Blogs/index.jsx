import React, { PureComponent } from 'react';
import { Switch, Route } from 'react-router-dom';
import BlogView from './Blogs';
import Blog from './Blog';

export default () => (
  <Switch>
    <Route exact path="/blogs" component={() => <BlogView />} />
    <Route exact path="/blogs/:blog" component={(props) => <Blog {...props} />} />
  </Switch>
);
