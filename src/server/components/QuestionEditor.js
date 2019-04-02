import React from "react";
import { Col, Row, Button } from "reactstrap";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import ContentSaveIcon from "mdi-react/ContentSaveIcon";
import QuestionEditorContent from "./QuestionEditorContent";
import QuestionEditorList from "./QuestionEditorList";
import { saveToStorage, downloadFile } from "../../shared/util/FileHelpers";
import { TQuestion } from "../../shared/types";

class QuestionEditor extends React.Component {
  constructor(props) {
    super(props);
    props.loadQuestionsFromStorage();
  }

  render() {
    const {
      // props
      selectedQuestion,
      questions,
      history,
      // actions
      addQuestion,
      selectQuestion,
      editCurrentQuestionText,
      editCurrentQuestionCode,
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
      sortAnswer,
      saveFileToStorage,
      validateAndSaveToStorage
    } = this.props;

    return (
      <>
        <Row className="justify-content-center mb-4">
          <Col md="4">
            <QuestionEditorList
              questions={questions}
              selectedQuestion={selectedQuestion}
              onSelectQuestion={selectQuestion}
              onAddQuestion={addQuestion}
              onSortQuestion={sortQuestion}
              onDownloadFile={() => {
                saveToStorage(JSON.stringify(questions));
                downloadFile(questions);
              }}
              onUploadFile={saveFileToStorage}
              onUploadDropbox={validateAndSaveToStorage}
            />
          </Col>
          <Col md="8">
            <QuestionEditorContent
              key={
                (questions[selectedQuestion] &&
                  questions[selectedQuestion].id) ||
                "none"
              }
              question={questions[selectedQuestion]}
              selectedQuestion={selectedQuestion}
              onEditQuestionText={editCurrentQuestionText}
              onEditQuestionCode={editCurrentQuestionCode}
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
                saveToStorage(JSON.stringify(questions));
                if (history) {
                  history.push("/server/create");
                }
              }}
              color="success"
              disabled={!questions.length > 0}
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

export default QuestionEditor;

QuestionEditor.propTypes = {
  selectedQuestion: PropTypes.number,
  questions: PropTypes.arrayOf(TQuestion).isRequired,
  // Questions
  selectQuestion: PropTypes.func.isRequired,
  addQuestion: PropTypes.func.isRequired,
  editCurrentQuestionText: PropTypes.func.isRequired,
  editCurrentQuestionCode: PropTypes.func.isRequired,
  editQuestionMode: PropTypes.func.isRequired,
  editQuestionType: PropTypes.func.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
  sortQuestion: PropTypes.func.isRequired,
  loadQuestionsFromStorage: PropTypes.func.isRequired,
  saveFileToStorage: PropTypes.func.isRequired,
  validateAndSaveToStorage: PropTypes.func.isRequired,
  // Answers
  addAnswer: PropTypes.func.isRequired,
  editAnswerText: PropTypes.func.isRequired,
  deleteAnswer: PropTypes.func.isRequired,
  setCorrectSingleAnswer: PropTypes.func.isRequired,
  setCorrectMultiAnswer: PropTypes.func.isRequired,
  sortAnswer: PropTypes.func.isRequired,
  initAnswers: PropTypes.func.isRequired,
  history: ReactRouterPropTypes.history.isRequired
};

QuestionEditor.defaultProps = {
  selectedQuestion: null
};
