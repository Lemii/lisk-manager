import React, { useContext } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import Overview from '../pages/Overview';
import AddNode from '../pages/AddNode';
import Settings from '../pages/Settings';
import Docs from '../pages/Docs';
import NotFound from '../pages/NotFound';
import Auth from '../pages/Auth';

import { PasswordContext } from '../contexts';

const Routes: React.FC = () => {
  const { password } = useContext(PasswordContext);

  const PrivateRoute = ({ component: Component, ...rest }: any) => (
    <Route
      {...rest}
      render={(props) => (password ? <Component {...props} /> : <Redirect to="/auth" />)}
    />
  );

  return (
    <Switch>
      <Route exact path="/auth" component={Auth} />
      <PrivateRoute exact path="/" component={Overview} />
      <PrivateRoute exact path="/add" component={AddNode} />
      <PrivateRoute exact path="/settings" component={Settings} />
      <Route exact path="/docs" component={Docs} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
