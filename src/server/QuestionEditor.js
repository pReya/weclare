import React from "react";
import "../scss/App.scss";
import { Col } from "reactstrap";
import QuestionContent from "./QuestionContent";

import QuestionList from "./QuestionList";

class QuestionEditor extends React.Component {
  state = {
    selectedQuestion: null,
    questions: [
      {
        text: "Wie ist die Antwort?",
        answers: ["Antwort A", "Antwort B", "Antwort C"]
      }
    ]
  };

  changeSelection = s => {
    this.setState({ selectedQuestion: s });
  };

  editQuestion = q => {
    const { questions, selectedQuestion } = this.state;
    const clonedQuestions = questions.slice();
    clonedQuestions[selectedQuestion] = q;
    this.setState({
      questions: clonedQuestions
    });
  };

  addQuestion = () => {
    this.setState(prevState => {
      const newQuestion = {
        text: "Wie ist die Antwort?",
        answers: ["Antwort A", "Antwort B"]
      };
      return {
        selectedQuestion: prevState.questions.length,
        questions: [...prevState.questions, newQuestion]
      };
    });
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
          <QuestionContent
            question={questions[selectedQuestion]}
            onEditQuestion={this.editQuestion}
            selectedQuestion={selectedQuestion}
          />
        </Col>
      </React.Fragment>
    );
  }
}

export default QuestionEditor;
