import React from "react";
import { Row } from "reactstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import QuestionCard from "../../shared/components/QuestionCard";
import AskScreenContinueButton from "./AskScreenContinueButton";
import getCurrentQuestion from "../selectors/questions";

class AskScreen extends React.Component {
  state = {
    countedAnswers: null
  };

  render() {
    const { countedAnswers } = this.state;
    const { currentQuestion } = this.props;

    return (
      <Row className="justify-content-center">
        <QuestionCard
          question={currentQuestion}
          countedAnswers={countedAnswers}
          disabled
        >
          <AskScreenContinueButton />
        </QuestionCard>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  currentQuestion: getCurrentQuestion(state)
});

export default connect(mapStateToProps)(withRouter(AskScreen));
