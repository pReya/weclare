import React from "react";
import { Col, Row, Button } from "reactstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import QuestionContent from "./QuestionContent";
import QuestionList from "./QuestionList";
import {
  selectQuestion,
  addQuestion,
  editQuestionText,
  deleteQuestion,
  loadQuestions,
  setCorrectAnswer,
  addAnswer,
  editAnswerText,
  deleteAnswer
} from "../actions/questionEditor";

const mapStateToProps = state => ({
  questions: state.questionEditor,
  selectedQuestion: state.selectedQuestion
});

const mapDispatchToProps = {
  selectQuestion,
  addQuestion,
  editQuestionText,
  deleteQuestion,
  addAnswer,
  editAnswerText,
  deleteAnswer,
  setCorrectAnswer,
  loadQuestions
};

class QuestionEditor extends React.Component {
  constructor(props) {
    super(props);
    const { loadQuestions } = this.props;
    const newQuestions = localStorage.getItem("weclare");
    if (newQuestions) {
      loadQuestions(JSON.parse(newQuestions));
    }
  }

  render() {
    const {
      // props
      selectedQuestion,
      questions,
      history,
      location,
      // actions
      addQuestion,
      selectQuestion,
      editQuestionText,
      deleteQuestion,
      addAnswer,
      editAnswerText,
      deleteAnswer,
      setCorrectAnswer
    } = this.props;

    return (
      <React.Fragment>
        <Row className="justify-content-center mb-4">
          <Col md="4">
            <QuestionList
              questions={questions}
              selectedQuestion={selectedQuestion}
              onSelectQuestion={selectQuestion}
              onAddQuestion={addQuestion}
            />
          </Col>
          <Col md="8">
            <QuestionContent
              question={questions[selectedQuestion]}
              selectedQuestion={selectedQuestion}
              onEditQuestionText={editQuestionText}
              onEditAnswerText={editAnswerText}
              onAddAnswer={addAnswer}
              onSetCorrectAnswer={setCorrectAnswer}
              onDeleteAnswer={deleteAnswer}
              onDeleteQuestion={deleteQuestion}
            />
          </Col>
        </Row>
        <Row className="justify-content-end">
          <Col md="2">
            <Button
              outline
              block
              onClick={() => {
                localStorage.setItem("weclare", JSON.stringify(questions));
                console.log("Saved to Storage");
                if (history) {
                  history.push("/server/create");
                }
              }}
              color="success"
            >
              Save & Continue
            </Button>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(QuestionEditor)
);
