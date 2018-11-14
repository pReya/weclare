import React from "react";
import "../scss/App.scss";
import { Col, Card, CardBody, CardText, CardHeader } from "reactstrap";

import QuestionList from "./QuestionList";

const questions = ["Frage 1", "Frage 2", "Frage 3"];

class QuestionEditor extends React.Component {
  state = {
    selectedQuestion: null
  };

  changeSelection = s => {
    console.log("Handler called with ", s);
    this.setState({ selectedQuestion: s });
  };

  render() {
    const { selectedQuestion } = this.state;
    return (
      <React.Fragment>
        <Col md="4">
          <QuestionList
            questions={questions}
            onSelect={this.changeSelection}
            selectedQuestion={selectedQuestion}
          />
        </Col>
        <Col md="8">
          <Card className="shadow">
            <CardHeader>
              <h6 className="my-0">Edit Question</h6>
            </CardHeader>
            <CardBody>
              <CardText>{questions[selectedQuestion]}</CardText>
            </CardBody>
          </Card>
        </Col>
      </React.Fragment>
    );
  }
}

export default QuestionEditor;
