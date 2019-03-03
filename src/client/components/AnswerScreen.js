import React from "react";
import { connect } from "react-redux";
import { Row } from "reactstrap";
import { changeInArray } from "../../shared/util/QuestionHelpers";
import { TQuestion, DQuestion } from "../../shared/types";
import { sendAnswers } from "../actions/client";
import SpinnerCard from "../../shared/components/SpinnerCard";
import QuestionCard from "../../shared/components/QuestionCard";

const mapStateToProps = state => ({
  currentQuestion: state.client.currentQuestion
});

const mapDispatchToProps = dispatch => ({
  onSendAnswers: answerIdxArray => dispatch(sendAnswers(answerIdxArray))
});

class AnswerScreen extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      disabled: false,
      selectedAnswersIdx: []
    };
    this.state = this.initialState;
  }

  componentDidUpdate(prevProps) {
    const { currentQuestion } = this.props;
    if (currentQuestion !== prevProps.currentQuestion) {
      this.resetState();
      this.initSelectedAnswers(currentQuestion.answers.length);
    }
  }

  toggleSelectedAnswers = answerIdx => {
    this.setState(prevState => {
      const { selectedAnswersIdx } = prevState;
      return {
        ...prevState,
        selectedAnswersIdx: changeInArray(
          selectedAnswersIdx,
          answerIdx,
          e => !e
        )
      };
    });
  };

  toggleDisabled = () => {
    this.setState(prevState => ({
      disabled: !prevState.disabled
    }));
  };

  resetState() {
    this.setState(this.initialState);
  }

  initSelectedAnswers(answerCount) {
    this.setState({ selectedAnswersIdx: Array(answerCount).fill(false) });
  }

  render() {
    const { currentQuestion, onSendAnswers } = this.props;
    const { disabled, selectedAnswersIdx } = this.state;
    const hasQuestion = Object.keys(currentQuestion).length > 0;
    const commonProps = {
      question: currentQuestion,
      disabled,
      selectedAnswersIdx,
      toggleSelectedAnswers: this.toggleSelectedAnswers,
      toggleDisabled: this.toggleDisabled,
      onSendAnswers
    };
    return (
      <Row className="justify-content-center">
        {hasQuestion ? (
          <QuestionCard {...commonProps} />
        ) : (
          <SpinnerCard
            title="Waiting For Question From Server"
            text="You're connected to the server, but the Quiz Session has not been started yet."
          />
        )}
      </Row>
    );
  }
}

AnswerScreen.propTypes = {
  currentQuestion: TQuestion
};
AnswerScreen.defaultProps = {
  currentQuestion: DQuestion
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnswerScreen);
