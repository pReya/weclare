import React from "react";
import { Container } from "reactstrap";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Route, Switch, Redirect } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension";
import Footer from "../../shared/components/Footer";
import Header from "./ServerHeaderContainer";
import ConnectFormServerContainer from "./ConnectFormServerContainer";
import QuestionEditorContainer from "./QuestionEditorContainer";
import AskScreenContainer from "./AskScreenContainer";
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
          <Switch>
            <Route
              exact
              path="/server/create"
              component={ConnectFormServerContainer}
            />
            <Route exact path="/server/ask" component={AskScreenContainer} />
            <Route
              exact
              path="/server/editor"
              component={QuestionEditorContainer}
            />
            <Route
              path="/server"
              render={() => <Redirect to="/server/editor" />}
            />
          </Switch>
          <Footer />
        </Container>
      </>
    </Provider>
  </div>
);
