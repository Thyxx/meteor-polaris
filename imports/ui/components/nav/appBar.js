import React from 'react';
import PropTypes from 'prop-types';
import AuthenticatedAppBar from './authenticatedAppBar';
import PublicAppBar from './publicAppBar';

const AppBar = props => (
  <div>
    {!props.authenticated ? <PublicAppBar /> : <AuthenticatedAppBar/>}
  </div>
);

AppBar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

export default AppBar;
