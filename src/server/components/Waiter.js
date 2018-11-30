import React from "react";
import { Row, Button } from "reactstrap";
import { connect } from "react-redux";
import DefaultCard from "../../shared/components/DefaultCard";
import { setCurrentQuestion } from "../actions/server";

const sendNextQuestion = (connections, questions, currentQuestion) => {
  console.log({ connections, questions, currentQuestion });
  if (connections.length > 0 && questions.length > 0) {
    connections.forEach(connection =>
      connection.send(JSON.stringify(questions[currentQuestion]))
    );
  }
};

const Waiter = props => {
  const { connections, questions, currentQuestion } = props;
  return (
    <Row className="justify-content-center">
      <DefaultCard title="Waiting for participants" text="Your ID: xyz">
        <Button
          outline
          block
          color="success"
          onClick={() => {
            setCurrentQuestion(currentQuestion + 1);
            sendNextQuestion(connections, questions, currentQuestion);
          }}
        >
          Send First Question
        </Button>
      </DefaultCard>
    </Row>
  );
};

const mapStateToProps = state => ({
  connections: state.server.connections,
  questions: state.questionEditor,
  currentQuestion: state.server.currentQuestion
});

const mapDispatchToProps = dispatch => ({
  setCurrentQuestion: questionIdx => dispatch(setCurrentQuestion(questionIdx))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Waiter);
