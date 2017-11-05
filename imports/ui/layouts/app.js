import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Index from '../pages/index'
import Callback from '../pages/callback'

const App = () => (
  <Router>
    <div>
      <Route exact name="index" path="/" component={Index}/>
      <Route exact path="/callback/" component={Callback}/>
    </div>
  </Router>
);

export default App;
