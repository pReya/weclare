import React from "react";
import { Button } from "reactstrap";
import { Helmet } from "react-helmet";
import DefaultCard from "./DefaultCard";
import { TQuestion, DQuestion } from "../types";

const QuestionCard = props => {
  const { question, onClickAnswer } = props;

  return (
    <>
      <Helmet>
        <title>Answer question</title>
      </Helmet>
      <DefaultCard title="Answer question" badge={question.progress} {...props}>
        {question.questionText && (
          <h4 className="text-center mb-4">{question.questionText}</h4>
        )}
        {question.answers &&
          question.answers.map((answer, i) => (
            <Button
              outline
              id={i}
              key={i}
              block
              onClick={e => {
                console.log("Target ID: ", e.target.id);
                onClickAnswer(e.target.id);
              }}
              color="success"
            >
              {answer.answerText}
            </Button>
          ))}
      </DefaultCard>
    </>
  );
};

QuestionCard.propTypes = { question: TQuestion };
QuestionCard.defaultProps = { question: DQuestion };

export default QuestionCard;
