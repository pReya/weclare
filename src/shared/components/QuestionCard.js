import React from "react";
import { Button, Badge } from "reactstrap";
import { Helmet } from "react-helmet";
import DefaultCard from "./DefaultCard";
import { TQuestion, DQuestion } from "../types";

const QuestionCard = props => {
  const {
    question,
    onClickAnswer,
    countedAnswers,
    disabled,
    selectedAnswerIdx
  } = props;
  return (
    <>
      <Helmet>
        <title>Answer question</title>
      </Helmet>
      <DefaultCard title="Answer question" badge={question.progress} {...props}>
        {question.text && (
          <div
            className="text-center mb-4 h4"
            dangerouslySetInnerHTML={{ __html: question.text }}
          />
        )}
        {question.answers &&
          question.answers.map((answer, i) => (
            <Button
              outline={selectedAnswerIdx !== i}
              id={i}
              key={i}
              block
              onClick={
                onClickAnswer
                  ? e => {
                      const selectedAnswer = parseInt(e.target.id, 10);
                      onClickAnswer(selectedAnswer);
                    }
                  : null
              }
              color="secondary"
              disabled={disabled}
            >
              {answer.text}
              {countedAnswers && (
                <Badge className="float-right" color="secondary">
                  {countedAnswers[i] !== 0 && countedAnswers[i]}
                </Badge>
              )}
            </Button>
          ))}
      </DefaultCard>
    </>
  );
};

QuestionCard.propTypes = { question: TQuestion };
QuestionCard.defaultProps = { question: DQuestion };

export default QuestionCard;
