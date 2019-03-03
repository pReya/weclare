import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import QuestionEditor from "./QuestionEditor";
import * as questionEditorActions from "../actions/questions";
import * as answerActions from "../actions/answers";

const mapStateToProps = state => ({
  questions: state.questionEditor,
  selectedQuestion: state.selectedQuestion
});

const mapDispatchToProps = {
  ...questionEditorActions,
  ...answerActions
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(QuestionEditor)
);
