import React from "react";
import { Row, Button } from "reactstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PlayIcon from "mdi-react/PlayIcon";
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
        questionIdx: currentQuestionIdx,
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

const AskScreen = props => {
  const {
    connections,
    questions,
    currentQuestionIdx,
    setCurrentQuestionIdx,
    history,
    status
  } = props;
  const hasClients = connections.length > 0;
  const currentQuestionIdxNoNull = currentQuestionIdx ? currentQuestionIdx : 0;
  const nextQuestionIdx = currentQuestionIdxNoNull + 1;
  const formattedQuestion = getFormattedQuestion(
    questions,
    currentQuestionIdxNoNull
  );

  return (
    <Row className="justify-content-center">
      {hasClients ? (
        <QuestionCard
          question={formattedQuestion.question}
          disabled
          footer={
            hasClients && (
              <Button
                color="secondary"
                block
                onClick={() => {
                  sendQuestion(formattedQuestion, connections);
                  // setCurrentQuestionIdx(nextQuestionIdx);
                  // Start receive period for answers
                  // Click second time:
                  // Stop receive period for answers
                }}
              >
                <PlayIcon style={{ paddingBottom: "3px" }} /> Start Question
              </Button>
            )
          }
        />
      ) : (
        <SpinnerCard title="Waiting for participants" />
      )}
    </Row>
  );
};

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
