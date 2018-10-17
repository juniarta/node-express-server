import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

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

export default withRouter(NoMatch);
