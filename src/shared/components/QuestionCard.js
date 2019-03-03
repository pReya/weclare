import React from "react";
import { Helmet } from "react-helmet";
import { TQuestion, DQuestion } from "../types";
import SingleQuestionCard from "./SingleQuestionCard";
import MultiQuestionCard from "./MultiQuestionCard";

const QuestionCard = props => {
  const { question, isServer } = props;

  const title = isServer ? "Ask Question" : "Answer Question";
  console.log("Props Question Card", props);
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {question.mode === "single" ? (
        <SingleQuestionCard title={title} question={question} {...props} />
      ) : (
        <MultiQuestionCard title={title} question={question} {...props} />
      )}
    </>
  );
};

QuestionCard.propTypes = { question: TQuestion };
QuestionCard.defaultProps = { question: DQuestion };

export default QuestionCard;
