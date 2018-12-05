import React from "react";
import { Row, Col, Card, CardHeader, CardBody, Container } from "reactstrap";
import snarkdown from "snarkdown";
import Header from "./shared/components/Header";
import Footer from "./shared/components/Footer";
import "github-markdown-css/github-markdown.css";

class About extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: ""
    };
  }

  componentDidMount() {
    fetch(`${process.env.PUBLIC_URL}/README.MD`)
      .then(response => response.text())
      .then(text => snarkdown(text))
      .then(data => this.setState({ data }));
  }

  render() {
    const { data } = this.state;
    return (
      <>
        <Header />
        <Container>
          <Row>
            <Col md="12">
              <Card className="shadow">
                <CardHeader>
                  <h6 className="my-0">About</h6>
                </CardHeader>
                <CardBody>
                  <div
                    className="markdown-body"
                    style={{
                      fontFamily: "IBM Plex Sans"
                    }}
                    dangerouslySetInnerHTML={{ __html: data }}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Footer />
        </Container>
      </>
    );
  }
}

export default About;
