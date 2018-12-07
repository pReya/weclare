import React from "react";
import { Row, Button } from "reactstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SpinnerCard from "../../shared/components/SpinnerCard";
import QuestionCard from "../../shared/components/QuestionCard";
import { setCurrentQuestionIdx } from "../actions/server";

const getFormattedQuestion = (questions, currentQuestionIdx) => {
  if (questions && questions[currentQuestionIdx]) {
    const question = questions[currentQuestionIdx];

    const { correctAnswers, ...questionWithoutAnswer } = question;
    const currentQuestionIdxString = String(currentQuestionIdx + 1);
    const questionsCount = Object.keys(questions).length;
    return {
      question: {
        ...questionWithoutAnswer,
        questionIdx: currentQuestionIdx + 1,
        progress: `${currentQuestionIdxString}/${questionsCount}`
      }
    };
  }
  return null;
};

const sendQuestion = (formattedQuestion, connections) => {
  if (connections.length > 0 && formattedQuestion) {
    connections.forEach(connection =>
      connection.send(JSON.stringify(formattedQuestion))
    );
  } else {
    console.error("Can't send question to clients");
  }
};

function AskScreen(props) {
  const {
    connections,
    questions,
    currentQuestionIdx,
    setCurrentQuestionIdx,
    history,
    status
  } = props;
  const hasClients = connections.length > 0;
  const nextQuestionIdx = currentQuestionIdx + 1;
  const formattedQuestion = getFormattedQuestion(questions, currentQuestionIdx);
  console.log(formattedQuestion);

  return (
    <>
      {hasClients ? (
        <QuestionCard
          question={formattedQuestion.question}
          footer={
            hasClients && (
              <Button
                color="secondary"
                block
                onClick={() => {
                  sendQuestion(formattedQuestion, connections);
                  setCurrentQuestionIdx(nextQuestionIdx);
                }}
              >
                Send Question
              </Button>
            )
          }
        />
      ) : (
        <SpinnerCard title="Waiting for participants" />
      )}
    </>
  );
}

const mapStateToProps = state => ({
  status: state.connection.status,
  connections: state.server.connections,
  questions: state.questionEditor,
  currentQuestionIdx: state.server.currentQuestion
});

const mapDispatchToProps = {
  setCurrentQuestionIdx
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AskScreen));
