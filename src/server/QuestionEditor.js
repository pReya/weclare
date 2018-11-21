import React from "react";
import "../scss/App.scss";
import { Col, Row, Button } from "reactstrap";
import { connect } from "react-redux";
import QuestionContent from "./QuestionContent";
import QuestionList from "./QuestionList";
import * as actions from "./actions";

const mapStateToProps = state => ({
  questions: state.questions,
  selectedQuestion: state.selectedQuestion
});

const mapDispatchToProps = dispatch => ({
  addQuestion: () => dispatch(actions.addQuestion())
});

class QuestionEditor extends React.Component {
  render() {
    const { addQuestion, selectedQuestion, questions } = this.props;
    return (
      <React.Fragment>
        <Row className="justify-content-center mb-4">
          <button onClick={addQuestion}>New question</button>
          {selectedQuestion}
          <pre>{JSON.stringify(questions, null, 2)}</pre>
          {/* <Col md="4">
            <QuestionList
              questions={Object.entries(questions)}
              onSelect={this.changeSelection}
              onAddQuestion={addQuestion}
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
          </Col> */}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuestionEditor);
