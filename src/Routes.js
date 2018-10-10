import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Intro from './Components/Intro';
import Home from './Components/Home';

export default function() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Intro} />
        <Route path="/Home" component={Home} />
      </Switch>
    </Router>
  );
}
