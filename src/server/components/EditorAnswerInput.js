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
      onSetCorrectSingleAnswer,
      onSetCorrectMultiAnswer,
      onDeleteAnswer,
      dragHandleProps
    } = this.props;
    const { isHovered } = this.state;

    const commonProps = {
      isCorrectAnswer,
      selectedQuestion,
      number
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
              {type === "single" ? (
                <RadioInput
                  {...commonProps}
                  onSetCorrectAnswer={() => {
                    onSetCorrectSingleAnswer(selectedQuestion, number);
                  }}
                />
              ) : (
                <CheckboxInput
                  {...commonProps}
                  onSetCorrectAnswer={() => {
                    onSetCorrectMultiAnswer(selectedQuestion, number);
                  }}
                />
              )}
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
  onSetCorrectSingleAnswer: PropTypes.func.isRequired,
  onSetCorrectMultiAnswer: PropTypes.func.isRequired,
  onDeleteAnswer: PropTypes.func.isRequired
};

export default EditorAnswerInput;

const RadioInput = props => {
  const { isCorrectAnswer, number, onSetCorrectAnswer } = props;
  return (
    <Input
      addon
      checked={isCorrectAnswer}
      type="radio"
      name="answer"
      onChange={onSetCorrectAnswer}
    />
  );
};

const CheckboxInput = props => {
  const { isCorrectAnswer, number, onSetCorrectAnswer } = props;
  return (
    <Input
      addon
      checked={isCorrectAnswer}
      type="checkbox"
      name={`answer-${number}`}
      onChange={onSetCorrectAnswer}
    />
  );
};
