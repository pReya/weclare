import React from "react";
import { Helmet } from "react-helmet";
import { TQuestion, DQuestion } from "../types";
import SingleQuestionCard from "./SingleQuestionCard";
import MultiQuestionCard from "./MultiQuestionCard";

const QuestionCard = props => {
  const { question } = props;
  console.log("QuestionCard props:", props);
  return (
    <>
      <Helmet>
        <title>Answer question</title>
      </Helmet>
      {question.mode === "single" ? (
        <SingleQuestionCard question={question} {...props} />
      ) : (
        <MultiQuestionCard question={question} {...props} />
      )}
    </>
  );
};

QuestionCard.propTypes = { question: TQuestion };
QuestionCard.defaultProps = { question: DQuestion, title: "Answer question" };

export default QuestionCard;
