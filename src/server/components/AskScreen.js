import React from "react";
import { Row, Button } from "reactstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PlayIcon from "mdi-react/PlayIcon";
import PauseIcon from "mdi-react/PauseIcon";
import SkipForwardIcon from "mdi-react/SkipForwardIcon";
import FormatListNumberedIcon from "mdi-react/FormatListNumberedIcon";
import SpinnerCard from "../../shared/components/SpinnerCard";
import QuestionCard from "../../shared/components/QuestionCard";
import {
  setCurrentQuestionIdx,
  toggleAcceptingAnswers
} from "../actions/server";

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

class AskScreen extends React.Component {
  state = {
    buttonPhase: 0,
    countedAnswers: null
  };

  countAnswers(registeredAnswers, questionIdx) {
    const countedAnswers = registeredAnswers[questionIdx].map(
      answer => answer.length
    );
    this.setState(prevState => ({ ...prevState, countedAnswers }));
  }

  render() {
    const {
      connections,
      questions,
      currentQuestionIdx,
      setCurrentQuestionIdx,
      toggleAcceptingAnswers,
      history,
      status,
      registeredAnswers
    } = this.props;
    const { buttonPhase, countedAnswers } = this.state;
    const hasClients = connections.length > 0;
    const currentQuestionIdxNoNull = currentQuestionIdx
      ? currentQuestionIdx
      : 0;
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
            countedAnswers={countedAnswers}
            disabled
            footer={
              hasClients && (
                <Button
                  color="secondary"
                  block
                  onClick={() => {
                    switch (buttonPhase) {
                      case 0:
                        sendQuestion(formattedQuestion, connections);
                        toggleAcceptingAnswers();
                        this.setState({
                          buttonPhase: 1
                        });
                        break;
                      case 1:
                        toggleAcceptingAnswers();
                        this.setState({
                          buttonPhase: 2
                        });
                        break;
                      case 2:
                        // Show voting results
                        this.countAnswers(
                          registeredAnswers,
                          currentQuestionIdxNoNull
                        );
                        this.setState({
                          buttonPhase: 3
                        });
                        break;
                      case 3:
                        setCurrentQuestionIdx(nextQuestionIdx);
                        this.setState({
                          buttonPhase: 0
                        });
                        break;
                      default:
                    }
                  }}
                >
                  {(() => {
                    switch (buttonPhase) {
                      case 0:
                        return (
                          <>
                            <PlayIcon style={{ paddingBottom: "3px" }} /> Start
                            question
                          </>
                        );
                      case 1:
                        return (
                          <>
                            <PauseIcon style={{ paddingBottom: "3px" }} /> Stop
                            Question
                          </>
                        );
                      case 2:
                        return (
                          <>
                            <FormatListNumberedIcon
                              style={{ paddingBottom: "3px" }}
                            />{" "}
                            Show Results
                          </>
                        );
                      case 3:
                        return (
                          <>
                            <SkipForwardIcon style={{ paddingBottom: "3px" }} />{" "}
                            Next Question
                          </>
                        );
                      default:
                        return <></>;
                    }
                  })()}
                </Button>
              )
            }
          />
        ) : (
          <SpinnerCard title="Waiting for participants" />
        )}
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  status: state.connection.status,
  connections: state.server.connections,
  questions: state.questionEditor,
  currentQuestionIdx: state.server.currentQuestion,
  registeredAnswers: state.registeredAnswers
});

const mapDispatchToProps = {
  setCurrentQuestionIdx,
  toggleAcceptingAnswers
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AskScreen));
