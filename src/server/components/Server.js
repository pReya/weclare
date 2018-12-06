import React from "react";
import "../../scss/App.scss";
import { Container } from "reactstrap";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Route } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension";
import Footer from "../../shared/components/Footer";
import Header from "./ServerHeaderContainer";
import CreatorContainer from "./CreatorContainer";
import QuestionEditor from "./QuestionEditor";
import AskScreen from "./AskScreen";
import mainReducer from "../reducers/main";

const store = createStore(
  mainReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default () => (
  <div>
    <Provider store={store}>
      <>
        <Header />
        <Container>
          <Route exact path="/server/create" component={CreatorContainer} />
          <Route exact path="/server/editor" component={QuestionEditor} />
          <Route exact path="/server/ask" component={AskScreen} />
          <Footer />
        </Container>
      </>
    </Provider>
  </div>
);
