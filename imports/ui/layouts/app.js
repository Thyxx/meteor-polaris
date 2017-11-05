import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Page } from '@shopify/polaris';
import Settings from '../pages/settings';
import Index from '../pages/index';
import Callback from '../pages/callback';

const App = () => (
  <Router>
    <Switch>
      <Page
        title="Shopify Manager"
      >
        <Route exact name="index" path="/" component={Index}/>
        <Route exact path="/settings" component={Settings}/>
        <Route exact path="/callback/" component={Callback}/>
      </Page>
    </Switch>
  </Router>
);

export default App;
