import React from "react";
import "../scss/App.scss";
import { Container } from "reactstrap";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { Route } from "react-router-dom";
import Footer from "../shared/Footer";
import Header from "../shared/Header";
import ServerProvider, { ServerContext } from "./ServerProvider";
import ServerIdCreator from "./ServerIdCreator";
import QuestionEditor from "./QuestionEditor";
import questionReducer from "./reducers";

const store = createStore(questionReducer);

export default () => (
  <div>
    <ServerProvider>
      <ServerContext.Consumer>
        {context => (
          <Header
            isServer
            status={context.status}
            numberOfClients={context.connections.length}
          />
        )}
      </ServerContext.Consumer>
      <Container>
        <Provider store={store}>
          <Route exact path="/server/createId" component={ServerIdCreator} />
          <Route
            exact
            path="/server/questionEditor"
            component={QuestionEditor}
          />
        </Provider>
        <Footer />
      </Container>
    </ServerProvider>
  </div>
);
