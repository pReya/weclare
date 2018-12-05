import React from "react";
import { Row, Button } from "reactstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import MDSpinner from "react-md-spinner";
import DefaultCard from "../../shared/components/DefaultCard";
import { setCurrentQuestionIdx } from "../actions/server";

const sendCurrentQuestion = (connections, questions, currentQuestionIdx) => {
  const question = questions[currentQuestionIdx];
  if (question) {
    const { correctAnswers, ...questionWithoutAnswer } = question;
    const msg = {
      question: {
        ...questionWithoutAnswer,
        questionIdx: String(currentQuestionIdx + 1)
      }
    };
    if (connections.length > 0 && questions.length > 0) {
      connections.forEach(connection => connection.send(JSON.stringify(msg)));
    }
  } else {
    console.error("Can't send question to clients");
  }
};

function Waiter(props) {
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

  return (
    <>
      <Helmet>
        <title>
          {hasClients ? "Send question" : "Waiting for participants"}
        </title>
      </Helmet>
      <Row className="justify-content-center">
        <DefaultCard
          title={hasClients ? "Send questions" : "Waiting for participants"}
          text={hasClients ? "Do you want to start the quiz?" : ""}
        >
          {hasClients ? (
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
          ) : (
            <div className="d-flex justify-content-center">
              <MDSpinner
                color1="#8a817c"
                color2="#f44336"
                color3="#dc9125"
                color4="#5fa15d"
                size={30}
              />
            </div>
          )}
        </DefaultCard>
      </Row>
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
)(withRouter(Waiter));
