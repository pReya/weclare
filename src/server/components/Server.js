import React from "react";
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
import WaitScreen from "./WaitScreen";
import AskScreen from "./AskScreen";
import mainServerReducer from "../reducers/main";

const serverStore = createStore(
  mainServerReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default () => (
  <div>
    <Provider store={serverStore}>
      <>
        <Header />
        <Container>
          <Route exact path="/server/create" component={CreatorContainer} />
          <Route exact path="/server/editor" component={QuestionEditor} />
          {/* <Route exact path="/server/wait" component={WaitScreen} /> */}
          <Route exact path="/server/ask" component={AskScreen} />
          <Footer />
        </Container>
      </>
    </Provider>
  </div>
);
