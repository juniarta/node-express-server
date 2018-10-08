import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';

import HelloWorld from 'Components/HelloWorld';
import Test from 'Components/Test';

const Index = () => {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/test">Test</Link>
          </li>
        </ul>

        <hr />
        <Switch>
          <Route path="/" exact component={HelloWorld} />
          <Route path="/test" component={Test} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
};

const NoMatch = ({ location }) => {
  return (
    <div>
      <p>
        No match for: <code>{location.pathname}</code>
      </p>
    </div>
  );
};

NoMatch.propTypes = {
  location: PropTypes.object
};

ReactDOM.render(<Index />, document.getElementById('app'));
