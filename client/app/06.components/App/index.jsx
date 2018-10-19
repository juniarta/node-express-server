import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import axios from 'axios';

import NoMatch from 'Components/404';
import Home from 'Components/Home';
import Login from 'Components/Login';
import Dashboard from 'Components/Dashboard';

const authUser = () => {
  axios
    .get('http://localhost:9009/api/v1/user/current')
    .then(data => console.log('-------------------------', data))
    .catch(err => console.error(err));
};

const App = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route
        path="/dashboard"
        render={() => (authUser() ? <Dashboard /> : <Redirect to="/login" />)}
      />
      <Route component={NoMatch} />
    </Switch>
  );
};

export default App;
