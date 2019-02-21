import React from "react";
import { Helmet } from "react-helmet";
import { TQuestion, DQuestion } from "../types";
import SingleQuestionContent from "./SingleQuestionContent";

const QuestionCard = props => {
  const {
    question,
    onClickAnswer,
    countedAnswers,
    disabled,
    selectedAnswersIdx,
    children,
    title,
    isServer
  } = props;

  const commonProps = {
    title,
    question,
    children,
    selectedAnswersIdx,
    onClickAnswer,
    disabled,
    countedAnswers,
    isServer
  };
  return (
    <>
      <Helmet>
        <title>Answer question</title>
      </Helmet>
      <SingleQuestionContent {...commonProps} />
    </>
  );
};

QuestionCard.propTypes = { question: TQuestion };
QuestionCard.defaultProps = { question: DQuestion, title: "Answer question" };

export default QuestionCard;
