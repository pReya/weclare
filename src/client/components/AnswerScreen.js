import React from "react";
import { connect } from "react-redux";
import { Row } from "reactstrap";
import QuestionCard from "../../shared/components/QuestionCard";
import SpinnerCard from "../../shared/components/SpinnerCard";

import { TQuestion, DQuestion } from "../../shared/types";

const mapStateToProps = state => ({
  currentQuestion: state.client.currentQuestion,
  connection: state.client.connection
});

const sendAnswer = (connection, answerIdx, questionIdx) => {
  if (connection) {
    connection.send({
      type: "answer",
      payload: {
        questionIdx,
        answerIdx,
        userId: connection.provider.id
      }
    });
  }
};

class AnswerScreen extends React.Component {
  constructor(props) {
    super(props);
    this.initialState = {
      disabled: false,
      selectedAnswerIdx: null
    };
    this.state = this.initialState;
  }

  componentDidUpdate(prevProps) {
    const { currentQuestion } = this.props;
    if (currentQuestion !== prevProps.currentQuestion) {
      this.resetState();
    }
  }

  resetState() {
    this.setState(this.initialState);
  }

  render() {
    const { currentQuestion, connection } = this.props;
    const { disabled, selectedAnswerIdx } = this.state;
    const hasQuestion = Object.keys(currentQuestion).length > 0;
    return (
      <Row className="justify-content-center">
        {hasQuestion ? (
          <QuestionCard
            question={currentQuestion}
            disabled={disabled}
            selectedAnswerIdx={selectedAnswerIdx}
            onClickAnswer={answerIdx => {
              console.log("Sending back answer ", answerIdx, currentQuestion);
              sendAnswer(connection, answerIdx, currentQuestion.questionIdx);
              this.setState(
                {
                  disabled: true,
                  selectedAnswerIdx: answerIdx
                },
                () => console.log("New state", this.state)
              );
            }}
          />
        ) : (
          <SpinnerCard title="Waiting for question" />
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

export default connect(mapStateToProps)(AnswerScreen);
