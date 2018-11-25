import React from "react";
import "../../scss/App.scss";
import { Container } from "reactstrap";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Route } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension";
import Footer from "../../shared/Footer";
import Header from "../../shared/Header";
import IdCreatorContainer from "./IdCreatorContainer";
import QuestionEditor from "./QuestionEditor";
import mainReducer from "../reducers/main";

const store = createStore(
  mainReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default () => (
  <div>
    <Provider store={store}>
      <>
        <Header isServer />
        <Container>
          <Route exact path="/server/createId" component={IdCreatorContainer} />
          <Route
            exact
            path="/server/questionEditor"
            component={QuestionEditor}
          />

          <Footer />
        </Container>
      </>
    </Provider>
  </div>
);
