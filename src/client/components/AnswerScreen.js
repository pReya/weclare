import React from "react";
import { Row, Button } from "reactstrap";
import { connect } from "react-redux";
import DefaultCard from "../../shared/components/DefaultCard";

const mapStateToProps = state => ({
  currentQuestion: state.client.currentQuestion,
  questionIdx: state.client.questionIdx
});

const AnswerScreen = props => {
  const { currentQuestion } = props;
  return (
    <Row className="justify-content-center">
      <DefaultCard title="Answer question" badge={currentQuestion.questionIdx}>
        <h4 className="text-center mb-4">{currentQuestion.questionText}</h4>
        {currentQuestion.answers &&
          currentQuestion.answers.map((question, i) => (
            <Button outline key={i} block color="success">
              {question.answerText}
            </Button>
          ))}
      </DefaultCard>
    </Row>
  );
};

export default connect(mapStateToProps)(AnswerScreen);
