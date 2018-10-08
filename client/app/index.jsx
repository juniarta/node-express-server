import './index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

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

        <Route exact path="/" component={HelloWorld} />
        <Route path="/test" component={Test} />
      </div>
    </Router>
  );
};

ReactDOM.render(<Index />, document.getElementById('app'));
