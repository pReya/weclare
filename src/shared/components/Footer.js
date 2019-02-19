import React from "react";
import GithubCircleIcon from "mdi-react/GithubCircleIcon";
import { Row, Col } from "reactstrap";

const Footer = () => (
  <div>
    <hr />
    <footer className="container">
      <Row>
        <Col>
          <a className="font-weight-light text-muted" href="/about">
            &copy; 2018 Moritz Stückler – HAW Hamburg
          </a>
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

export default Footer;
