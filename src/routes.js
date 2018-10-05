import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Intro from "./Components/Intro";
import Login from './Components/Login';

export default function() {
  return (
    <Router>
      <main>
        <Route exact path="/" component={Intro} />
        <Route path={"/login"} component={Login} />
      </main>
    </Router>
  );
}
