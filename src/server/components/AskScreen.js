import React from "react";
import { Row } from "reactstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
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
              <p>Answers received: {receivedAnswersCounter}</p>
            )}
            <AskScreenContinueButton
              toggleShowVoteCount={this.toggleShowVoteCount}
            />
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
