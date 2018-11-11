import React from "react";
import "../scss/App.scss";
import { Container, Row, Col } from "reactstrap";
import { Route, Redirect } from "react-router-dom";
import Footer from "../shared/footer";
import Header from "../shared/header";
import ServerProvider, { ServerContext } from "./ServerProvider";
import ServerIdCreator from "./ServerIdCreator";

export default () => {
  console.log("HALLO");
  return (
    <div>
      <ServerProvider>
        <ServerContext.Consumer>
          {context => {
            console.log("Consumer: ", context);
            return (
              <Header
                isServer
                status={context.status}
                numberOfClients={context.connections.length}
              />
            );
          }}
        </ServerContext.Consumer>
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <Route
                exact
                path="/server/createId"
                render={() => <ServerIdCreator />}
              />
            </Col>
          </Row>
          <Footer />
        </Container>
      </ServerProvider>
    </div>
  );
};
