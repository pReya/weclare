import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Server from "./server/components/Server";
import Client from "./client/components/Client";

import StartPage from "./StartPage";
import "./scss/App.scss";

const App = () => (
  <Router basename={process.env.PUBLIC_URL}>
    <div className="App">
      <Switch>
        <Route path="/" exact component={StartPage} />
        <Route path="/server" component={Server} />
        <Route path="/client" component={Client} />
      </Switch>
    </div>
  </Router>
);

export default App;