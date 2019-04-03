import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import AskScreen from "./AskScreen";
import { getCurrentQuestion } from "../selectors/questions";
import {
  getAnswerCountForCurrentQuestion,
  getNumberOfUsersAnsweredString
} from "../selectors/answers";
import { incrementQuestionIdx, decrementQuestionIdx } from "../actions/server";
import { runCurrentCode } from "../actions/doppio";
import { hasPreviousQuestion, hasNextQuestion } from "../selectors/server";
import { resetTerminal } from "../actions/terminal";

const mapStateToProps = state => ({
  currentQuestion: getCurrentQuestion(state),
  countedAnswers: getAnswerCountForCurrentQuestion(state),
  receivedAnswersCounter: getNumberOfUsersAnsweredString(state),
  hasPreviousQuestion: hasPreviousQuestion(state),
  hasNextQuestion: hasNextQuestion(state),
  acceptingAnswers: state.server.acceptingAnswers,
  isBusy: state.server.isBusy
});

const mapDispatchToProps = {
  incrementQuestionIdx,
  decrementQuestionIdx,
  runCurrentCode,
  resetTerminal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AskScreen));
