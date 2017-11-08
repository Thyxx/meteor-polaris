import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import Settings from '../pages/settings';
import Index from '../pages/index';
import Login from '../pages/login';
import Callback from '../pages/callback';
import AppBar from '../components/nav/appBar';
import Authenticated from '../components/authenticated';
import Public from '../components/public';

const App = props => (
  <Router>
    <div>
      <AppBar {...props}/>
      <Switch>
        <Route exact name="index" path="/" component={Index}/>
        <Authenticated exact path="/settings" component={Settings} {...props}/>
        <Authenticated exact path="/callback/" component={Callback} {...props}/>
        <Public path="/login" component={Login} {...props} />
      </Switch>
    </div>
  </Router>
);

const getUserName = name => ({
  string: name,
  object: `${name.first} ${name.last}`,
}[typeof name]);

export default withTracker(() => {
  const loggingIn = Meteor.loggingIn();
  const user = Meteor.user();
  const userId = Meteor.userId();
  const name = user && user.profile && user.profile.name && getUserName(user.profile.name);
  const emailAddress = user && user.emails && user.emails[0].address;

  return {
    loggingIn,
    authenticated: !loggingIn && !!userId,
    name: name || emailAddress,
    userId,
    emailAddress,
    emailVerified: user && user.emails ? user && user.emails && user.emails[0].verified : true,
  };
})(App);
