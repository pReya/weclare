import React from "react";
import { connect } from "react-redux";
import QuestionCard from "../../shared/components/QuestionCard";
import SpinnerCard from "../../shared/components/SpinnerCard";

import { TQuestion, DQuestion } from "../../shared/types";

const mapStateToProps = state => ({
  currentQuestion: state.client.currentQuestion
});

const AnswerScreen = props => {
  const { currentQuestion } = props;
  const hasQuestion = Object.keys(currentQuestion).length > 0;
  return hasQuestion ? (
    <QuestionCard question={currentQuestion} />
  ) : (
    <SpinnerCard title="Waiting for question" />
  );
};

AnswerScreen.propTypes = {
  currentQuestion: TQuestion
};
AnswerScreen.defaultProps = {
  currentQuestion: DQuestion
};

export default connect(mapStateToProps)(AnswerScreen);
