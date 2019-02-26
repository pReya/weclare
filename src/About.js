import React from "react";
import { Row, Col, Card, CardHeader, CardBody, Container } from "reactstrap";
import snarkdown from "snarkdown";
import raw from "raw.macro";
import Header from "./shared/components/Header";
import Footer from "./shared/components/Footer";
import "github-markdown-css/github-markdown.css";

const About = () => (
  <>
    <Header />
    <Container>
      <Row>
        <Col md="12">
          <Card className="shadow-none">
            <CardHeader>
              <h6 className="my-0">About</h6>
            </CardHeader>
            <CardBody>
              <div
                className="markdown-body"
                style={{
                  fontFamily: "IBM Plex Sans"
                }}
                // eslint-disable-next-line
                dangerouslySetInnerHTML={{
                  __html: snarkdown(raw("../public/README.MD"))
                }}
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Footer />
    </Container>
  </>
);

export default About;
