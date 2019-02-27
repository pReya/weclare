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
      receivedAnswersCounter
    } = this.props;
    const { showVoteCount } = this.state;
    console.log("Counted Answers", countedAnswers);
    return (
      <Row className="justify-content-center">
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
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  currentQuestion: getCurrentQuestion(state),
  countedAnswers: getAnswerCountForCurrentQuestion(state),
  receivedAnswersCounter: getReceivedAnswersCounter(state)
});

export default connect(mapStateToProps)(withRouter(AskScreen));
