import React from "react";
import { Provider } from "react-redux";
import { Container } from "reactstrap";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { Route, Switch } from "react-router-dom";
import mainClientReducer from "../reducers/main";
import Footer from "../../shared/components/Footer";
import Header from "./ClientHeaderContainer";
import ConnectorContainer from "./ConnectorContainer";
import AnswerScreen from "./AnswerScreen";

const clientStore = createStore(
  mainClientReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const Client = () => (
  <div>
    <Provider store={clientStore}>
      <>
        <Header />
        <Container>
          <Switch>
            <Route
              exact
              path="/client/connect/:serverId?"
              component={ConnectorContainer}
            />
            <Route exact path="/client/answer" component={AnswerScreen} />
          </Switch>
          <Footer />
        </Container>
      </>
    </Provider>
  </div>
);

export default Client;
