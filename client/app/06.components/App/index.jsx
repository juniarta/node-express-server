import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import axios from 'axios';

import NoMatch from 'Components/404';
import Home from 'Components/Home';
import Login from 'Components/Login';
import Dashboard from 'Components/Dashboard';

class App extends Component {
  state = {
    auth: false
  };

  componentDidMount() {
    axios
      .get('http://localhost:9009/api/v1/user/current')
      .then(() => {
        this.setState({
          auth: true
        });
      })
      .catch(() => {
        this.setState({
          auth: false
        });
      });
  }

  render() {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route
          path="/login"
          render={() =>
            !this.state.auth ? <Login /> : <Redirect to="/dashboard" />
          }
        />
        <Route
          path="/dashboard"
          render={() =>
            this.state.auth ? <Dashboard /> : <Redirect to="/login" />
          }
        />
        <Route component={NoMatch} />
      </Switch>
    );
  }
}

export default App;
