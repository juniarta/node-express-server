import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NoMatch from 'Components/404';
import Dashboard from 'Components/Dashboard';
import Login from 'Components/Login';

const App = () => {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/login" component={Login} />
      <Route component={NoMatch} />
    </Switch>
  );
};

export default App;
