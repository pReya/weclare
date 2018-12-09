import React from "react";
import { Row, Button } from "reactstrap";
import { Helmet } from "react-helmet";
import DefaultCard from "./DefaultCard";
import { TQuestion, DQuestion } from "../types";

const QuestionCard = props => {
  const { question } = props;

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
            <Button outline key={i} block color="success">
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
