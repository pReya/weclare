import React from "react";
import "../../scss/App.scss";
import { Provider } from "react-redux";
import { Container } from "reactstrap";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { Route } from "react-router-dom";
import mainReducer from "../reducers/main";
import Footer from "../../shared/Footer";
import Header from "../../shared/Header";
import IdConnector from "./IdConnector";

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
          <Route exact path="/client/connectId" component={IdConnector} />
          <Footer />
        </Container>
      </>
    </Provider>
  </div>
);

export default Client;
