import React from "react";
import { Button, Badge } from "reactstrap";
import DefaultCard from "./DefaultCard";

const SingleQuestionContent = props => {
  const {
    title,
    question,
    selectedAnswersIdx = [],
    onClickAnswer,
    disabled,
    countedAnswers,
    children,
    isServer
  } = props;

  console.log("Selected Answers", selectedAnswersIdx);
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
            outline={!selectedAnswersIdx.includes(i)}
            id={i}
            key={answer.id}
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
      {question.mode === "multi" &&
        !isServer && <Button block>Send Answers</Button>}
    </DefaultCard>
  );
};

export default SingleQuestionContent;
