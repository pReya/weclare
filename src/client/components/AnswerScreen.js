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
  console.log("questionIdx", questionIdx);
  if (connection) {
    console.log("My ID", connection.provider.id);
    connection.send({
      answer: {
        questionIdx,
        answerIdx,
        peer: connection.provider.id
      }
    });
  }
};

const AnswerScreen = props => {
  const { currentQuestion, connection } = props;
  const hasQuestion = Object.keys(currentQuestion).length > 0;
  return (
    <Row className="justify-content-center">
      {hasQuestion ? (
        <QuestionCard
          question={currentQuestion}
          onClickAnswer={answerIdx => {
            console.log("Sending back answer ", answerIdx, currentQuestion);
            sendAnswer(connection, answerIdx, currentQuestion.questionIdx);
          }}
        />
      ) : (
        <SpinnerCard title="Waiting for question" />
      )}
    </Row>
  );
};

AnswerScreen.propTypes = {
  currentQuestion: TQuestion
};
AnswerScreen.defaultProps = {
  currentQuestion: DQuestion
};

export default connect(mapStateToProps)(AnswerScreen);
