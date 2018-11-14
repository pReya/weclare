import React from "react";
import "../scss/App.scss";
import { Badge, Col, Card, CardBody, CardText, CardHeader } from "reactstrap";

import QuestionList from "./QuestionList";

const questions = ["Frage 1", "Frage 2"];

class QuestionEditor extends React.Component {
  state = {
    selectedQuestion: null
  };

  changeSelection = s => {
    console.log("Handler called");
    this.setState({ selectedQuestion: s });
  };

  render() {
    return (
      <React.Fragment>
        <Col md="4">
          <QuestionList questions={questions} onSelect={this.changeSelection} />
        </Col>
        <Col md="8">
          <Card className="shadow">
            <CardHeader>
              <h6 className="my-0">Edit Question</h6>
            </CardHeader>
            <CardBody>
              <CardText>MEMEMEME</CardText>
            </CardBody>
          </Card>
        </Col>
      </React.Fragment>
    );
  }
}

export default QuestionEditor;
