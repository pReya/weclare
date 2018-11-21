import React from "react";
import "../scss/App.scss";
import { Col, Row, Button } from "reactstrap";
import QuestionContent from "./QuestionContent";
import QuestionList from "./QuestionList";

class QuestionEditor extends React.Component {
  render() {
    const { selectedQuestion, questions } = this.state;
    return (
      <React.Fragment>
        <Row className="justify-content-center mb-4">
          <Col md="4">
            <QuestionList
              questions={Object.entries(questions)}
              onSelect={this.changeSelection}
              onAddQuestion={this.addQuestion}
              selectedQuestion={selectedQuestion}
            />
          </Col>
          <Col md="8">
            <QuestionContent
              question={questions[selectedQuestion]}
              selectedQuestion={selectedQuestion}
              onEditQuestionText={this.editQuestionText}
              onEditAnswerText={this.editAnswerText}
              onAddAnswer={this.addAnswer}
              onEditCorrectAnswer={this.editCorrectAnswer}
              onDeleteAnswer={this.deleteAnswer}
            />
          </Col>
        </Row>
        <Row className="justify-content-end">
          <Col md="2">
            <Button outline block color="success">
              Continue
            </Button>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default QuestionEditor;
