import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Dashboard from 'Components/Dashboard';
import Login from 'Components/Login';

const NoMatch = ({ location }) => {
  return (
    <div>
      <p>
        No match for: <code>{location.pathname}</code>
      </p>
    </div>
  );
};

const Index = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
};

NoMatch.propTypes = {
  location: PropTypes.object
};

ReactDOM.render(<Index />, document.getElementById('app'));
