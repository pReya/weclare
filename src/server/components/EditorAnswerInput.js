import React from "react";
import PropTypes from "prop-types";
import { Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import DeleteIcon from "mdi-react/DeleteIcon";
import DragIcon from "mdi-react/DragIcon";
import PencilIcon from "mdi-react/PencilIcon";

class EditorAnswerInput extends React.Component {
  state = {
    isHovered: false
  };

  render() {
    const {
      answer,
      number,
      type,
      selectedQuestion,
      isCorrectAnswer,
      onEditAnswerText,
      onSetCorrectAnswer,
      onDeleteAnswer,
      dragHandleProps
    } = this.props;
    const { isHovered } = this.state;

    const getHtmlType = questionType =>
      ({
        single: "radio",
        multi: "checkbox"
      }[questionType]);

    const inputTypeSwitch = questionType => {
      switch (questionType) {
        case "single":
          return (
            <Input
              addon
              checked={isCorrectAnswer}
              type="checkbox"
              name={`answer-${index}`}
              onChange={() => {
                onSetCorrectAnswer(selectedQuestion, index);
              }}
            />
          );

        case "multi":
          return (
            <Input
              addon
              checked={isCorrectAnswer}
              type="checkbox"
              name={`answer-${index}`}
              onChange={() => {
                onSetCorrectAnswer(selectedQuestion, index);
              }}
            />
          );

        case "text":
          console.log("Text");
          return null;

        default:
          return null;
      }
    };

    return (
      <>
        <span className="invisible" {...dragHandleProps} />
        <InputGroup
          className="mb-2"
          onMouseEnter={() => this.setState({ isHovered: true })}
          onMouseLeave={() => this.setState({ isHovered: false })}
        >
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              {}
              <Input
                addon
                checked={isCorrectAnswer}
                type={getHtmlType(type)}
                name="answer"
                onChange={() => {
                  onSetCorrectAnswer(selectedQuestion, number);
                }}
              />
            </InputGroupText>
          </InputGroupAddon>
          <Input value={answer} onChange={onEditAnswerText} />

          {isHovered && (
            <InputGroupAddon addonType="append">
              <InputGroupText className="pointerCursor">
                <PencilIcon />
              </InputGroupText>
              <InputGroupText
                className="pointerCursor"
                onClick={() => {
                  onDeleteAnswer(selectedQuestion, number);
                }}
              >
                <DeleteIcon />
              </InputGroupText>
              <InputGroupText className="pointerCursor" {...dragHandleProps}>
                <DragIcon />
              </InputGroupText>
            </InputGroupAddon>
          )}
        </InputGroup>
      </>
    );
  }
}

EditorAnswerInput.propTypes = {
  selectedQuestion: PropTypes.number.isRequired,
  answer: PropTypes.string.isRequired,
  onEditAnswerText: PropTypes.func.isRequired,
  number: PropTypes.number.isRequired,
  isCorrectAnswer: PropTypes.bool.isRequired,
  onSetCorrectAnswer: PropTypes.func.isRequired,
  onDeleteAnswer: PropTypes.func.isRequired
};

export default EditorAnswerInput;

const SingleChoiceInput = props => {
  const {
    isCorrectAnswer,
    selectedQuestion,
    number,
    onSetCorrectAnswer,
    isCorrectAnswer
  } = props;
  return (
    <Input
      addon
      checked={isCorrectAnswer}
      type="radio"
      name="answer"
      onChange={() => {
        onSetCorrectAnswer(selectedQuestion, number);
      }}
    />
  );
};

const MultiChoiceInput = props => {
  const {
    isCorrectAnswer,
    selectedQuestion,
    index,
    onSetCorrectAnswer,
    isCorrectAnswer
  } = props;
  return (
    <Input
      addon
      checked={isCorrectAnswer}
      type="checkbox"
      name={`answer-${index}`}
      onChange={() => {
        onSetCorrectAnswer(selectedQuestion, index);
      }}
    />
  );
};
