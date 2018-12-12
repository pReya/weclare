import React from "react";
import { Button, Badge } from "reactstrap";
import { Helmet } from "react-helmet";
import DefaultCard from "./DefaultCard";
import { TQuestion, DQuestion } from "../types";

class QuestionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: false || props.disabled,
      selectedAnswerIdx: null,
      correctAnswerIdx: null
    };
  }

  render() {
    const { question, onClickAnswer, countedAnswers } = this.props;
    const { isDisabled, selectedAnswerIdx } = this.state;

    return (
      <>
        <Helmet>
          <title>Answer question</title>
        </Helmet>
        <DefaultCard
          title="Answer question"
          badge={question.progress}
          {...this.props}
        >
          {question.questionText && (
            <h4 className="text-center mb-4">{question.questionText}</h4>
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
                        this.setState({
                          isDisabled: true,
                          selectedAnswerIdx: selectedAnswer
                        });
                      }
                    : null
                }
                color="secondary"
                disabled={isDisabled}
              >
                {answer.answerText}
                <Badge className="float-right" color="secondary">
                  {countedAnswers && countedAnswers[i]}
                </Badge>
              </Button>
            ))}
        </DefaultCard>
      </>
    );
  }
}

QuestionCard.propTypes = { question: TQuestion };
QuestionCard.defaultProps = { question: DQuestion };

export default QuestionCard;
