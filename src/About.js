import React from "react";
import { Row, Col, Card, CardHeader, CardBody, Container } from "reactstrap";
import Header from "./shared/components/Header";
import Footer from "./shared/components/Footer";

const About = () => (
  <>
    <Header />
    <Container>
      <Row>
        <Col md="12">
          <Card className="shadow">
            <CardHeader>
              <h6 className="my-0">About</h6>
            </CardHeader>
            <CardBody>Text123</CardBody>
          </Card>
        </Col>
      </Row>
      <Footer />
    </Container>
  </>
);

export default About;
