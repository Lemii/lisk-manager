import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Overview from '../pages/Overview';
import AddNode from '../pages/AddNode';
import Settings from '../pages/Settings';
import Faq from '../pages/Faq';
import NotFound from '../pages/NotFound';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Overview} />
    <Route exact path="/add" component={AddNode} />
    <Route exact path="/settings" component={Settings} />
    <Route exact path="/faq" component={Faq} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
