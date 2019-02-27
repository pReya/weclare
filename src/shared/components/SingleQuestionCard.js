import React from "react";
import { Button, Badge } from "reactstrap";
import DefaultCard from "./DefaultCard";
import Logger from "../util/Logger";

const MultiQuestionCard = props => {
  const {
    title,
    question,
    selectedAnswersIdx = [],
    onClickAnswer,
    disabled,
    countedAnswers,
    children,
    toggleSelectedAnswers,
    onSendAnswers,
    isServer,
    toggleDisabled
  } = props;

  return (
    <DefaultCard title={title} badge={question.progress} footer={children}>
      {question.text && (
        <div
          className="text-center mb-4 h4"
          // eslint-disable-next-line
          dangerouslySetInnerHTML={{ __html: question.text }}
        />
      )}
      {question.answers &&
        question.answers.map((answer, i) => (
          <Button
            outline={!selectedAnswersIdx[i]}
            id={i}
            key={answer.id}
            block
            onClick={e => {
              const selectedAnswer = parseInt(e.target.id, 10);
              toggleSelectedAnswers(selectedAnswer);
              Logger.info("Sending single answer ", selectedAnswer);
              onSendAnswers([selectedAnswer]);
              toggleDisabled();
            }}
            color="secondary"
            disabled={disabled}
          >
            {answer.text}
            {countedAnswers && (
              <Badge className="float-right align-middle" color="secondary">
                {typeof countedAnswers[i] === "number" && countedAnswers[i]}
              </Badge>
            )}
          </Button>
        ))}
    </DefaultCard>
  );
};

export default MultiQuestionCard;
