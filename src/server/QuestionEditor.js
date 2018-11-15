import React from "react";
import "../scss/App.scss";
import { Col, Card, CardBody, CardText, CardHeader } from "reactstrap";

import QuestionList from "./QuestionList";

class QuestionEditor extends React.Component {
  state = {
    selectedQuestion: null,
    questions: []
  };

  changeSelection = s => {
    this.setState({ selectedQuestion: s });
  };

  addQuestion = q => {
    this.setState(prevState => ({
      questions: [...prevState.questions, q]
    }));
  };

  render() {
    const { selectedQuestion, questions } = this.state;
    return (
      <React.Fragment>
        <Col md="4">
          <QuestionList
            questions={questions}
            onSelect={this.changeSelection}
            onAddQuestion={this.addQuestion}
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
