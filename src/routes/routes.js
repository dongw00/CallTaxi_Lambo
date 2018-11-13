import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Intro from '../views/Intro/Intro';
import MainPage from '../views/MainPage/MainPage';

export default function() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Intro} />
        <Route path="/MainPage" component={MainPage} />
      </Switch>
    </Router>
  );
}
