import React from "react";
import { Button, Badge } from "reactstrap";
import hljs from "highlight.js/lib/highlight";
import java from "highlight.js/lib/languages/java";
import PropTypes from "prop-types";
import DefaultCard from "./DefaultCard";
import "../scss/quill.scss";
import Logger from "../util/Logger";
import { TQuestion, DQuestion } from "../types";
import CodemirrorWrapper from "./CodemirrorWrapper";

class QuestionCard extends React.Component {
  // Convert boolean array to numerical array, e.g. [true, false, true] -> [0,2]
  static convertSelectedAnswersArray(selectedAnswersArray) {
    if (selectedAnswersArray) {
      return selectedAnswersArray
        .map((answer, i) => answer && i)
        .filter(answer => typeof answer === "number");
    }
    return [];
  }

  constructor(props) {
    super(props);
    hljs.registerLanguage("java", java);
    hljs.configure({ languages: ["java"] });
  }

  componentDidUpdate() {
    const block = document.querySelector(".ql-syntax");
    if (block) {
      hljs.highlightBlock(block);
    }
  }

  render() {
    const {
      question,
      selectedAnswersIdx,
      disabled,
      countedAnswers,
      children,
      toggleSelectedAnswers,
      onSendAnswers,
      isServer,
      toggleDisabled,
      highlightSolutions
    } = this.props;

    let footer;
    if (question.mode === "multi" && !isServer) {
      footer = (
        <>
          <p className="text-center text-muted">
            Multiple choice question: Select answers and click send.
          </p>
          <Button
            color="primary"
            disabled={disabled}
            onClick={() => {
              const selectedAnswers = QuestionCard.convertSelectedAnswersArray(
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
          {children}
        </>
      );
    } else {
      footer = children;
    }

    return (
      <DefaultCard
        title={isServer ? "Ask Question" : "Answer Question"}
        badge={question && question.progress}
        footer={footer}
      >
        {question.text && (
          <div
            id="code-container"
            className="text-center my-5 h4"
            // eslint-disable-next-line
            dangerouslySetInnerHTML={{ __html: question.text }}
          />
        )}
        {question.code && (
          <CodemirrorWrapper content={question.code} readOnly="nocursor" />
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
                if (question.mode === "single") {
                  Logger.info("Sending single answer ", selectedAnswer);
                  onSendAnswers([selectedAnswer]);
                  toggleDisabled();
                }
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
  }
}

QuestionCard.propTypes = {
  question: TQuestion,
  selectedAnswersIdx: PropTypes.arrayOf(PropTypes.bool),
  disabled: PropTypes.bool,
  countedAnswers: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.bool
  ]),
  children: PropTypes.node,
  toggleSelectedAnswers: PropTypes.func,
  onSendAnswers: PropTypes.func,
  isServer: PropTypes.bool,
  toggleDisabled: PropTypes.func,
  highlightSolutions: PropTypes.bool
};
QuestionCard.defaultProps = {
  question: DQuestion,
  selectedAnswersIdx: [],
  disabled: false,
  countedAnswers: [],
  children: null,
  toggleSelectedAnswers: () => console.log("Click"),
  onSendAnswers: () => console.log("Click"),
  isServer: false,
  toggleDisabled: () => console.log("Click"),
  highlightSolutions: false
};

export default QuestionCard;
