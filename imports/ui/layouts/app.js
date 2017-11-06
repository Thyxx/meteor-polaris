import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Settings from '../pages/settings';
import Index from '../pages/index';
import Callback from '../pages/callback';
import AppBar from '../components/appBar';

const App = () => (
  <Router>
    <div>
      <AppBar/>
      <Switch>
        <Route exact name="index" path="/" component={Index}/>
        <Route exact path="/settings" component={Settings}/>
        <Route exact path="/callback/" component={Callback}/>
      </Switch>
    </div>
  </Router>
);

export default App;
