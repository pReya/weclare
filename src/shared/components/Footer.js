import React from "react";
import GithubCircleIcon from "mdi-react/GithubCircleIcon";
import { Row, Col } from "reactstrap";

export default function Footer() {
  return (
    <div>
      <hr />
      <footer className="container">
        <Row>
          <Col>
            <p className="font-weight-light text-muted">
              &copy; 2018 Moritz Stückler – HAW Hamburg
            </p>
          </Col>
          <Col className="text-right">
            <a href="https://github.com/pReya/weclare/">
              <GithubCircleIcon />
            </a>
          </Col>
        </Row>
      </footer>
    </div>
  );
}
