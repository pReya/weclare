import React from "react";
import { Button } from "reactstrap";
import { Helmet } from "react-helmet";
import DefaultCard from "./DefaultCard";
import { TQuestion, DQuestion } from "../types";

class QuestionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isDisabled: false || props.disabled };
  }

  render() {
    const { question, onClickAnswer } = this.props;
    const { isDisabled } = this.state;

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
                outline
                id={i}
                key={i}
                block
                onClick={
                  onClickAnswer
                    ? e => {
                        onClickAnswer(parseInt(e.target.id, 10));
                        this.setState({
                          isDisabled: true
                        });
                      }
                    : null
                }
                color="success"
                disabled={isDisabled}
              >
                {answer.answerText}
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
