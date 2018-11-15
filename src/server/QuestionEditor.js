import React from "react";
import "../scss/App.scss";
import { Col } from "reactstrap";
import QuestionContent from "./QuestionContent";

import QuestionList from "./QuestionList";

class QuestionEditor extends React.Component {
  state = {
    selectedQuestion: null,
    questions: {
      1: {
        questionType: "singleChoice",
        questionText: "Wie ist die Antwort?",
        answers: {
          1: {
            answerText: "Antwort A"
          },
          2: {
            answerText: "Antwort B"
          },
          3: {
            answerText: "Antwort C"
          }
        }
      },
      2: {
        questionType: "singleChoice",
        questionText: "Wie ist die Antwort2?",
        answers: {
          1: {
            answerText: "Lol"
          },
          2: {
            answerText: "Haha"
          },
          3: {
            answerText: "Dies das"
          }
        }
      }
    }
  };

  changeSelection = s => {
    this.setState({ selectedQuestion: s });
  };

  editQuestion = q => {
    const { questions, selectedQuestion } = this.state;
    const clonedQuestions = questions.slice();
    clonedQuestions[selectedQuestion] = q;
    this.setState({
      questions: q
    });
  };

  editAnswers = (a, i) => {
    const { questions, selectedQuestion } = this.state;
    const clonedQuestions = questions.slice();
    const clonedAnswers = (clonedQuestions[selectedQuestion].answers[i] = a);
    this.setState({
      questions: clonedAnswers
    });
  };

  addQuestion = () => {
    this.setState(prevState => {
      const newQuestion = {
        questionType: "singleChoice",
        questionText: "Wie ist die Antwort?",
        answers: {
          1: {
            answerText: "Antwort A"
          },
          2: {
            answerText: "Antwort B"
          },
          3: {
            answerText: "Antwort C"
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

  render() {
    const { selectedQuestion, questions } = this.state;
    console.log("selectedQuestion", selectedQuestion);
    return (
      <React.Fragment>
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
          />
        </Col>
      </React.Fragment>
    );
  }
}

export default QuestionEditor;
