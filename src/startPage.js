import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";

import SelectBox from "./selectBox";
import "./scss/App.scss";

const StartPage = () => (
  <div className="App">
    <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
      <h1 className="display-4">Weclare</h1>
      <p className="lead">
        A web based, peer-to-peer classroom response system, tailored to
        computer science education at university level.
      </p>
    </div>
    <Container>
      <Row>
        <div className="card-deck mb-3 text-center">
          <Col>
            <SelectBox
              header="For Instructors 👩‍🏫"
              text="Start the server app, which allows you to create new question sets and accept connections from students."
              icon="graduation-cap"
            >
              <Button
                tag={Link}
                to="/server"
                className="btn btn-lg btn-block btn-outline-primary"
              >
                Create Quiz
              </Button>
            </SelectBox>
          </Col>
          <Col>
            <SelectBox
              header="For Students 👩‍🎓"
              text="Start the client app, which allows you to connect to an existing session and answer questions."
            >
              <Button
                tag={Link}
                to="/client"
                className="btn btn-lg btn-block btn-outline-primary"
              >
                Join Quiz
              </Button>
            </SelectBox>
          </Col>
        </div>
      </Row>
    </Container>
  </div>
);

export default StartPage;
