import React from "react";
import ReactDOM from "react-dom";
import { Container, Row, Col, Button } from "reactstrap";
import Server from "./server";
import Client from "./client";

import SelectBox from "./selectBox";
import "./App.css";

const MyButton = props => {
  const { onClick, text, className } = props;
  return (
    <Button onClick={onClick} className={className}>
      {text}
    </Button>
  );
};

const App = () => (
  <div className="App">
    <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
      <h1 className="display-4">Weclare</h1>
      <p className="lead">
        A web based classroom response system, tailored to computer science
        education at university level.
      </p>
    </div>
    <Container>
      <Row>
        <div className="card-deck mb-3 text-center">
          <Col>
            <SelectBox
              header="Server: For Instructors"
              text="Start the server app, which allows you to create new question sets and accept connections from students."
              button=<MyButton
                onClick={() =>
                  ReactDOM.render(<Client />, document.getElementById("root"))
                }
                className="btn btn-lg btn-block btn-outline-primary"
              >
                TEST
              </MyButton>
            />
          </Col>
          <Col>
            <SelectBox
              header="Client: For Students"
              text="Start the client app, which allows you to connect to an existing session and answer questions."
              button="Start Client"
              onClick={() =>
                ReactDOM.render(<Server />, document.getElementById("root"))
              }
            />
          </Col>
        </div>
      </Row>
    </Container>
  </div>
);

export default App;
