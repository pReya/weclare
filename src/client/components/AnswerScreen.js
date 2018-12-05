import React from "react";
import { Row, Button } from "reactstrap";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import MDSpinner from "react-md-spinner";
import DefaultCard from "../../shared/components/DefaultCard";

const mapStateToProps = state => ({
  currentQuestion: state.client.currentQuestion,
  questionIdx: state.client.questionIdx
});

const AnswerScreen = props => {
  const { currentQuestion } = props;

  return (
    <>
      <Helmet>
        <title>Answer question</title>
      </Helmet>
      <Row className="justify-content-center">
        <DefaultCard
          title={
            currentQuestion.length > 0
              ? "Answer question"
              : "Waiting for question to be sent"
          }
          badge={currentQuestion.questionIdx}
        >
          {currentQuestion.length > 0 ? (
            <>
              <h4 className="text-center mb-4">
                {currentQuestion.questionText}
              </h4>
              {currentQuestion.answers &&
                currentQuestion.answers.map((question, i) => (
                  <Button outline key={i} block color="success">
                    {question.answerText}
                  </Button>
                ))}
            </>
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
};

export default connect(mapStateToProps)(AnswerScreen);
