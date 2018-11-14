import React from "react";
import "../scss/App.scss";
import { Container, Row, Col } from "reactstrap";
import { Route } from "react-router-dom";
import Footer from "../shared/Footer";
import Header from "../shared/Header";
import ServerProvider, { ServerContext } from "./ServerProvider";
import ServerIdCreator from "./ServerIdCreator";
import QuestionSetSelect from "./QuestionSetSelect";

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
        <Row className="justify-content-center">
          <Col md="8">
            <Route exact path="/server/createId" component={ServerIdCreator} />
            <Route
              exact
              path="/server/questionEditor"
              component={QuestionSetSelect}
            />
          </Col>
        </Row>
        <Footer />
      </Container>
    </ServerProvider>
  </div>
);
