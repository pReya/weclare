import React from "react";
import { Col, Row, Button } from "reactstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import tv4 from "tv4";
import Logger from "../../shared/util/Logger";
import QuestionContent from "./QuestionContent";
import QuestionList from "./QuestionList";
import QuestionSchema from "../../shared/util/questionsSchema";
import * as questionEditorActions from "../actions/questionEditor";
import * as answerActions from "../actions/answers";

const mapStateToProps = state => ({
  questions: state.questionEditor,
  selectedQuestion: state.selectedQuestion
});

const mapDispatchToProps = { ...questionEditorActions, ...answerActions };

class QuestionEditor extends React.Component {
  constructor(props) {
    super(props);
    this.loadQuestionsFromStorage();
  }

  loadQuestionsFromStorage = () => {
    const { loadQuestions } = this.props;
    const newQuestions = localStorage.getItem("weclare");
    if (newQuestions) {
      loadQuestions(JSON.parse(newQuestions));
    }
  };

  getFormattedDate = () => {
    const today = new Date();
    let dd = today.getDate();

    let mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();

    if (dd < 10) {
      dd = `0${dd}`;
    }

    if (mm < 10) {
      mm = `0${mm}`;
    }
    return `${dd}-${mm}-${yyyy}`;
  };

  downloadFile = data => {
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(data)
    )}`;
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute(
      "download",
      `weclare-${this.getFormattedDate()}.json`
    );
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    Logger.info("Created and started file download");
  };

  saveToStorage = data => {
    localStorage.setItem("weclare", data);
    Logger.info("Saved questionset to local storage");
  };

  saveFileToStorage = file => {
    const reader = new FileReader();
    reader.onload = () => {
      Logger.info("Successfully read questionset from file");
      const valid = tv4.validate(JSON.parse(reader.result), QuestionSchema);
      if (valid) {
        Logger.info("Questionset was successfully validated");
        this.saveToStorage(reader.result);
        this.loadQuestionsFromStorage();
      } else {
        Logger.error("Imported file was invalid", tv4.error);
      }
    };
    reader.readAsText(file);
  };

  render() {
    const {
      // props
      selectedQuestion,
      questions,
      history,
      // actions
      addQuestion,
      selectQuestion,
      editQuestionText,
      editQuestionMode,
      deleteQuestion,
      addAnswer,
      editAnswerText,
      deleteAnswer,
      setCorrectSingleAnswer,
      setCorrectMultiAnswer,
      initAnswers,
      sortQuestion,
      sortAnswer
    } = this.props;

    return (
      <>
        <Row className="justify-content-center mb-4">
          <Col md="4">
            <QuestionList
              questions={questions}
              selectedQuestion={selectedQuestion}
              onSelectQuestion={selectQuestion}
              onAddQuestion={addQuestion}
              onSortQuestion={sortQuestion}
              onDownloadFile={() => {
                this.saveToStorage(JSON.stringify(questions));
                this.downloadFile(questions);
              }}
              onUploadFile={this.saveFileToStorage}
            />
          </Col>
          <Col md="8">
            <QuestionContent
              question={questions[selectedQuestion]}
              selectedQuestion={selectedQuestion}
              onEditQuestionText={editQuestionText}
              onEditQuestionMode={editQuestionMode}
              onEditAnswerText={editAnswerText}
              onAddAnswer={addAnswer}
              onSetCorrectSingleAnswer={setCorrectSingleAnswer}
              onSetCorrectMultiAnswer={setCorrectMultiAnswer}
              onSortAnswer={sortAnswer}
              onDeleteAnswer={deleteAnswer}
              onDeleteQuestion={deleteQuestion}
            />
          </Col>
        </Row>
        <Row className="justify-content-end">
          <Col xs="auto">
            <Button
              outline
              block
              onClick={() => {
                initAnswers();
                this.saveToStorage(JSON.stringify(questions));
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
      </>
    );
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(QuestionEditor)
);

QuestionEditor.propTypes = {
  selectedQuestion: PropTypes.number,
  questions: PropTypes.array.isRequired,
  // Questions
  loadQuestions: PropTypes.func.isRequired,
  selectQuestion: PropTypes.func.isRequired,
  addQuestion: PropTypes.func.isRequired,
  editQuestionText: PropTypes.func.isRequired,
  editQuestionMode: PropTypes.func.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
  sortQuestion: PropTypes.func.isRequired,
  // Answers
  addAnswer: PropTypes.func.isRequired,
  editAnswerText: PropTypes.func.isRequired,
  deleteAnswer: PropTypes.func.isRequired,
  setCorrectSingleAnswer: PropTypes.func.isRequired,
  setCorrectMultiAnswer: PropTypes.func.isRequired,
  sortAnswer: PropTypes.func.isRequired,
  initAnswers: PropTypes.func.isRequired
};
