import React from "react";
import { Row, Button } from "reactstrap";
import { connect } from "react-redux";
import DefaultCard from "../../shared/components/DefaultCard";
import { setCurrentQuestionIdx } from "../actions/server";

const sendCurrentQuestion = (connections, questions, currentQuestion) => {
  console.log({ connections, questions, currentQuestion });
  const msg = {
    question: {
      ...questions[currentQuestion],
      questionIdx: String(currentQuestion)
    }
  };
  if (connections.length > 0 && questions.length > 0) {
    connections.forEach(connection => connection.send(JSON.stringify(msg)));
  }
  console.log("TEST1");
};

const Waiter = props => {
  const { connections, questions, currentQuestionIdx } = props;
  const hasClients = connections.length > 0;
  const nextQuestionIdx = currentQuestionIdx + 1;

  console.log(
    `currentQuestionIdx: ${currentQuestionIdx} nextQuestionIdx: ${nextQuestionIdx}`
  );
  return (
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
              console.log("TEST2");
              setCurrentQuestionIdx(nextQuestionIdx);
            }}
          >
            Send First Question
          </Button>
        )}
      </DefaultCard>
    </Row>
  );
};

const mapStateToProps = state => ({
  connections: state.server.connections,
  questions: state.questionEditor,
  currentQuestionIdx: state.server.currentQuestion
});

const mapDispatchToProps = dispatch => ({
  setCurrentQuestionIdx: questionIdx =>
    dispatch(setCurrentQuestionIdx(questionIdx))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Waiter);
