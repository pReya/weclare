import React from "react";
import "../../scss/App.scss";
import { Provider } from "react-redux";
import { Container } from "reactstrap";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { Route } from "react-router-dom";
import mainReducer from "../reducers/main";
import Footer from "../../shared/components/Footer";
import Header from "./ClientHeaderContainer";
import ConnectorContainer from "./ConnectorContainer";
import AnswerScreen from "./AnswerScreen";

const store = createStore(
  mainReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const Client = () => (
  <div>
    <Provider store={store}>
      <>
        <Header />
        <Container>
          <Route exact path="/client/connect" component={ConnectorContainer} />
          <Route exact path="/client/answer" component={AnswerScreen} />
          <Footer />
        </Container>
      </>
    </Provider>
  </div>
);

export default Client;
