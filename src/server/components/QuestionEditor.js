import React from "react";
import { Col, Row, Button } from "reactstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import tv4 from "tv4";
import ContentSaveIcon from "mdi-react/ContentSaveIcon";
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

  static getFormattedDate = () => {
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

  loadQuestionsFromStorage = () => {
    const { loadQuestions } = this.props;
    const newQuestions = localStorage.getItem("weclare");
    if (newQuestions) {
      loadQuestions(JSON.parse(newQuestions));
    }
  };

  downloadFile = data => {
    const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(data)
    )}`;
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute(
      "download",
      `weclare-${QuestionEditor.getFormattedDate()}.json`
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

  validateAndSaveToStorage = data => {
    const valid = tv4.validate(JSON.parse(data), QuestionSchema);
    if (valid) {
      Logger.info("Questionset was successfully validated");
      this.saveToStorage(data);
      this.loadQuestionsFromStorage();
    } else {
      Logger.error("Imported file was invalid", tv4.error);
    }
  };

  saveFileToStorage = file => {
    const reader = new FileReader();
    reader.onload = () => {
      this.validateAndSaveToStorage(reader.result);
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
      editQuestionType,
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
              onUploadDropbox={this.validateAndSaveToStorage}
            />
          </Col>
          <Col md="8">
            <QuestionContent
              question={questions[selectedQuestion]}
              selectedQuestion={selectedQuestion}
              onEditQuestionText={editQuestionText}
              onEditQuestionMode={editQuestionMode}
              onEditQuestionType={editQuestionType}
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
              <ContentSaveIcon style={{ paddingBottom: "3px" }} /> Save &
              Continue
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
  editQuestionType: PropTypes.func.isRequired,
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
