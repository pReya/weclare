import React from "react";
import "../scss/App.scss";
import { Col, Row, Button } from "reactstrap";
import update from "immutability-helper";

import QuestionContent from "./QuestionContent";

import QuestionList from "./QuestionList";

class QuestionEditor extends React.Component {
  state = {
    selectedQuestion: null,
    questions: {}
  };

  changeSelection = s => {
    this.setState({ selectedQuestion: s });
  };

  addAnswer = () => {
    const { questions, selectedQuestion } = this.state;
    const answerCount = Object.keys(questions[selectedQuestion].answers).length;
    const answer = "Answer";
    const modState = update(this.state, {
      questions: {
        [selectedQuestion]: {
          answers: { $merge: { [answerCount + 1]: { answerText: answer } } }
        }
      }
    });
    this.setState(modState, () => console.log("New state: ", this.state));
  };

  editAnswer = (a, i) => {
    const { selectedQuestion } = this.state;
    const modState = update(this.state, {
      questions: {
        [selectedQuestion]: { answers: { [i]: { answerText: { $set: a } } } }
      }
    });
    this.setState(modState, () => console.log("New state: ", this.state));
  };

  addQuestion = () => {
    this.setState(prevState => {
      const newQuestion = {
        questionType: "singleChoice",
        questionText: "New question",
        answers: {
          1: {
            answerText: "Answer"
          }
        }
      };
      const oldNumberOfQuestions = Object.keys(prevState.questions).length;
      return {
        selectedQuestion: oldNumberOfQuestions + 1,
        questions: {
          ...prevState.questions,
          [oldNumberOfQuestions + 1]: newQuestion
        }
      };
    });
  };

  editQuestion = newText => {
    const { selectedQuestion } = this.state;
    const modState = update(this.state, {
      questions: { [selectedQuestion]: { questionText: { $set: newText } } }
    });
    this.setState(modState);
  };

  render() {
    const { selectedQuestion, questions } = this.state;
    console.log("selectedQuestion", selectedQuestion);
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
              onEditQuestion={this.editQuestion}
              selectedQuestion={selectedQuestion}
              onEditAnswer={this.editAnswer}
              onAddAnswer={this.addAnswer}
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
