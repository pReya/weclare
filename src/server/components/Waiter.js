import React from "react";
import { Row, Button } from "reactstrap";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import DefaultCard from "../../shared/components/DefaultCard";
import { setCurrentQuestionIdx } from "../actions/server";

const sendCurrentQuestion = (connections, questions, currentQuestionIdx) => {
  const question = questions[currentQuestionIdx];
  if (question) {
    const { correctAnswers, ...questionWithoutAnswer } = question;
    const msg = {
      question: {
        ...questionWithoutAnswer,
        questionIdx: String(currentQuestionIdx)
      }
    };
    if (connections.length > 0 && questions.length > 0) {
      connections.forEach(connection => connection.send(JSON.stringify(msg)));
    }
  } else {
    console.error("Can't send question to clients");
  }
};

const Waiter = props => {
  const {
    connections,
    questions,
    currentQuestionIdx,
    setCurrentQuestionIdx
  } = props;
  const hasClients = connections.length > 0;
  const nextQuestionIdx = currentQuestionIdx + 1;

  return (
    <>
      <Helmet>
        <title>Waiting</title>
      </Helmet>
      <Row className="justify-content-center">
        <DefaultCard
          title={hasClients ? "Send questions" : "Waiting for participants"}
          text={
            hasClients
              ? "Do you want to start the quiz?"
              : "Can't start the quiz until there is at least one client connected."
          }
        >
          {hasClients && (
            <Button
              outline
              block
              color="success"
              onClick={() => {
                sendCurrentQuestion(connections, questions, currentQuestionIdx);
                setCurrentQuestionIdx(nextQuestionIdx);
              }}
            >
              Send Next Question
            </Button>
          )}
        </DefaultCard>
      </Row>
    </>
  );
};

const mapStateToProps = state => ({
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
)(Waiter);
