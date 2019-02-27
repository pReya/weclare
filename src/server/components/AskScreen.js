import React from "react";
import { Row, Col, Button } from "reactstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import FormatListNumberedIcon from "mdi-react/FormatListNumberedIcon";
import QuestionCard from "../../shared/components/QuestionCard";
import AskScreenContinueButton from "./AskScreenContinueButton";
import { getCurrentQuestion } from "../selectors/questions";
import {
  getAnswerCountForCurrentQuestion,
  getReceivedAnswersCounter
} from "../selectors/answers";
import { setNextQuestionIdx, setPreviousQuestionIdx } from "../actions/server";
import { ChevronRight, ChevronLeft } from "../../shared/components/Chevron";
import { hasPreviousQuestion, hasNextQuestion } from "../selectors/server";

class AskScreen extends React.Component {
  state = {
    showVoteCount: false
  };

  toggleShowVoteCount = () => {
    this.setState(prevState => ({
      showVoteCount: !prevState.showVoteCount
    }));
  };

  render() {
    const {
      currentQuestion,
      countedAnswers,
      receivedAnswersCounter,
      hasNextQuestion,
      hasPreviousQuestion,
      setNextQuestionIdx,
      setPreviousQuestionIdx
    } = this.props;
    const { showVoteCount } = this.state;
    console.log("Counted Answers", countedAnswers);
    return (
      <Row className="justify-content-center">
        <Col xs="2" className="align-self-center">
          <ChevronLeft
            disabled={!hasPreviousQuestion}
            onClick={() => setPreviousQuestionIdx()}
          />
        </Col>
        <QuestionCard
          question={currentQuestion}
          countedAnswers={showVoteCount && countedAnswers}
          isServer
          disabled
        >
          <>
            {receivedAnswersCounter && (
              <div className="d-flex flex-row justify-content-between align-items-center mb-2">
                {/* <div className="d-flex flex-row justify-content-between"> */}

                <div className="text-muted">
                  {receivedAnswersCounter} users have answered
                </div>

                <Button
                  size="sm"
                  outline={!showVoteCount}
                  onClick={this.toggleShowVoteCount}
                >
                  <FormatListNumberedIcon style={{ paddingBottom: "3px" }} />{" "}
                  {showVoteCount ? "Hide" : "Show"} Results
                </Button>
              </div>
            )}

            <AskScreenContinueButton />
          </>
        </QuestionCard>
        <Col xs="2" className="align-self-center">
          <ChevronRight
            disabled={!hasNextQuestion}
            onClick={() => setNextQuestionIdx()}
          />
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  currentQuestion: getCurrentQuestion(state),
  countedAnswers: getAnswerCountForCurrentQuestion(state),
  receivedAnswersCounter: getReceivedAnswersCounter(state),
  hasPreviousQuestion: hasPreviousQuestion(state),
  hasNextQuestion: hasNextQuestion(state)
});

const mapDispatchToProps = {
  setNextQuestionIdx,
  setPreviousQuestionIdx
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AskScreen));
