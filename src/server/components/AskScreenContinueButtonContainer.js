import { connect } from "react-redux";
import { nextAskScreenState } from "../actions/server";
import { isConnected, hasNextQuestion } from "../selectors/server";
import AskScreenContinueButton from "./AskScreenContinueButton";

const mapStateToProps = state => ({
  isConnected: isConnected(state),
  hasNextQuestion: hasNextQuestion(state),
  currentAskScreenState: state.server.currentAskScreenState
});

const mapDispatchToProps = {
  nextAskScreenState
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AskScreenContinueButton);
