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
    isServer
  } = props;

  console.log("Children Multi", children);

  return (
    <DefaultCard
      title={title}
      badge={question && question.progress}
      footer={
        <>
          {question.mode === "multi" &&
            !isServer && <Button block>Send Answers</Button>}
          {children}
        </>
      }
    >
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
              Logger.info("Toggling multi answer ", selectedAnswer);
            }}
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
  );
};

export default MultiQuestionCard;
