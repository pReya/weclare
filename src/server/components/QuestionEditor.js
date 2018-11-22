import React from "react";
import "../../scss/App.scss";
import { Col, Row, Button } from "reactstrap";
import { connect } from "react-redux";
import QuestionContent from "./QuestionContent";
import QuestionList from "./QuestionList";
import * as actions from "../actions/actions";

const mapStateToProps = state => ({
  questions: state.questions,
  selectedQuestion: state.selectedQuestion
});

const mapDispatchToProps = dispatch => ({
  selectQuestion: questionIdx => dispatch(actions.selectQuestion(questionIdx)),
  addQuestion: () => dispatch(actions.addQuestion()),
  editQuestionText: (questionIdx, questionText) =>
    dispatch(actions.editQuestionText(questionIdx, questionText)),
  deleteQuestion: questionIdx => dispatch(actions.deleteQuestion(questionIdx)),
  addAnswer: questionIdx => dispatch(actions.addAnswer(questionIdx)),
  editAnswerText: (questionIdx, answerText, answerIdx) =>
    dispatch(actions.editAnswerText(questionIdx, answerText, answerIdx)),
  deleteAnswer: (questionIdx, answerIdx) =>
    dispatch(actions.deleteAnswer(questionIdx, answerIdx)),
  setCorrectAnswer: (questionIdx, answerIdx) =>
    dispatch(actions.setCorrectAnswer(questionIdx, answerIdx))
});

// const mapDispatchToProps = {
//   addQuestion,
//   selectQuestion,
//   editQuestionText,
//   deleteQuestion,
//   addAnswer,
//   editAnswerText,
//   deleteAnswer,
//   setCorrectAnswer
// };

const QuestionEditor = props => {
  const {
    selectedQuestion,
    questions,
    addQuestion,
    selectQuestion,
    editQuestionText,
    deleteQuestion,
    addAnswer,
    editAnswerText,
    deleteAnswer,
    setCorrectAnswer
  } = props;
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
          <Button outline block color="success">
            Continue
          </Button>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionEditor);
