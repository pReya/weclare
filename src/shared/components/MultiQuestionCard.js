import React from "react";
import { Button, Badge } from "reactstrap";
import DefaultCard from "./DefaultCard";
import Logger from "../util/Logger";

const convertSelectedAnswersArray = selectedAnswersArray => {
  if (selectedAnswersArray) {
    return selectedAnswersArray
      .map((answer, i) => answer && i)
      .filter(answer => typeof answer === "number");
  }
  return [];
};

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

  console.log("Selected Answers", selectedAnswersIdx);

  return (
    <DefaultCard
      title={title}
      badge={question && question.progress}
      footer={
        <>
          {question.mode === "multi" &&
            !isServer && (
              <>
                <p className="text-center text-muted">
                  Multiple choice question: Select answers and click send.
                </p>
                <Button
                  color="primary"
                  disabled={disabled}
                  onClick={() => {
                    const selectedAnswers = convertSelectedAnswersArray(
                      selectedAnswersIdx
                    );
                    Logger.info("Sending multi answer ", selectedAnswers);
                    onSendAnswers(selectedAnswers);
                    toggleDisabled();
                  }}
                  block
                >
                  Send Answers
                </Button>
              </>
            )}
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

export default MultiQuestionCard;
