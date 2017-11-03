import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Index from '../pages/index'

const App = () => (
  <Router>
    <Route exact name="index" path="/" component={Index}/>
  </Router>
);

export default App;
