import React from "react";
import { Button, Badge } from "reactstrap";
import DefaultCard from "./DefaultCard";
import Logger from "../util/Logger";

const SingleQuestionCard = props => {
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
    toggleDisabled,
    highlightSolutions
  } = props;

  return (
    <DefaultCard title={title} badge={question.progress} footer={children}>
      {question.text && (
        <div
          className="text-center my-5 h4"
          // eslint-disable-next-line
          dangerouslySetInnerHTML={{ __html: question.text }}
        />
      )}
      {question.answers &&
        question.answers.map((answer, i) => (
          <Button
            outline={
              !(highlightSolutions && answer.isCorrect) &&
              !selectedAnswersIdx[i]
            }
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
            color={
              highlightSolutions && answer.isCorrect ? "success" : "secondary"
            }
            disabled={disabled}
          >
            {answer.text}
            {countedAnswers && (
              <Badge
                className="float-right"
                style={{ lineHeight: 1.5 }}
                color="secondary"
              >
                {typeof countedAnswers[i] === "number" && countedAnswers[i]}
              </Badge>
            )}
          </Button>
        ))}
    </DefaultCard>
  );
};

export default SingleQuestionCard;
