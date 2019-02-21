import React from "react";
import { connect } from "react-redux";
import { Row } from "reactstrap";
import QuestionCard from "../../shared/components/QuestionCard";
import SpinnerCard from "../../shared/components/SpinnerCard";

import { TQuestion, DQuestion } from "../../shared/types";
import { sendAnswer } from "../actions/client";

const mapStateToProps = state => ({
  currentQuestion: state.client.currentQuestion,
  connection: state.client.connection
});

const mapDispatchToProps = dispatch => ({
  onSendAnswer: answerIdx => dispatch(sendAnswer(answerIdx))
});

// const sendAnswer = (connection, answerIdx, questionIdx) => {
//   if (connection) {
//     connection.send({
//       type: "answer",
//       payload: {
//         questionIdx,
//         answerIdx,
//         userId: connection.provider.id
//       }
//     });
//   }
// };

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
    }
  }

  resetState() {
    this.setState(this.initialState);
  }

  render() {
    const { currentQuestion, connection, onSendAnswer } = this.props;
    const { disabled, selectedAnswersIdx } = this.state;
    const hasQuestion = Object.keys(currentQuestion).length > 0;
    return (
      <Row className="justify-content-center">
        {hasQuestion ? (
          <QuestionCard
            question={currentQuestion}
            disabled={disabled}
            selectedAnswersIdx={selectedAnswersIdx}
            onClickAnswer={answerIdx => {
              console.log("Sending back answer ", answerIdx, currentQuestion);
              onSendAnswer(answerIdx);
              this.setState(
                prevState => ({
                  disabled: true,
                  selectedAnswersIdx: [
                    ...prevState.selectedAnswersIdx,
                    answerIdx
                  ]
                }),
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnswerScreen);
