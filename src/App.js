import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Helmet } from "react-helmet";
import Server from "./server/components/Server";
import Client from "./client/components/Client";
import About from "./About";
import StartPage from "./StartPage";
import "./scss/App.scss";

const App = () => (
  <Router basename={process.env.PUBLIC_URL}>
    <div className="App">
      <Helmet
        titleTemplate="Weclare | %s"
        defaultTitle="Weclare – A web based classroom response system"
      />
      <Switch>
        <Route path="/" exact component={StartPage} />
        <Route path="/server" component={Server} />
        <Route path="/client" component={Client} />
        <Route path="/about" component={About} />
      </Switch>
    </div>
  </Router>
);

export default App;
