import React from "react";
import PropTypes from "prop-types";
import { Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import DeleteIcon from "mdi-react/DeleteIcon";
import DragIcon from "mdi-react/DragIcon";

class QuestionEditorAnswerInput extends React.Component {
  state = {
    isHovered: false
  };

  render() {
    const {
      answer,
      number,
      mode,
      selectedQuestion,
      isCorrectAnswer,
      onEditAnswerText,
      onSetCorrectSingleAnswer,
      onSetCorrectMultiAnswer,
      onDeleteAnswer,
      dragHandleProps,
      disabled
    } = this.props;
    const { isHovered } = this.state;

    const commonProps = {
      isCorrectAnswer,
      selectedQuestion,
      number,
      disabled
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
              {mode === "single" ? (
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
              {/* <InputGroupText className="pointerCursor">
                <PencilIcon />
              </InputGroupText> */}
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

QuestionEditorAnswerInput.propTypes = {
  selectedQuestion: PropTypes.number.isRequired,
  answer: PropTypes.string.isRequired,
  onEditAnswerText: PropTypes.func.isRequired,
  number: PropTypes.number.isRequired,
  isCorrectAnswer: PropTypes.bool.isRequired,
  onSetCorrectSingleAnswer: PropTypes.func.isRequired,
  onSetCorrectMultiAnswer: PropTypes.func.isRequired,
  onDeleteAnswer: PropTypes.func.isRequired
};

export default QuestionEditorAnswerInput;

const RadioInput = props => {
  const { isCorrectAnswer, onSetCorrectAnswer, disabled } = props;
  return (
    <Input
      addon
      checked={isCorrectAnswer}
      type="radio"
      name="answer"
      onChange={onSetCorrectAnswer}
      disabled={disabled}
    />
  );
};

RadioInput.propTypes = {
  isCorrectAnswer: PropTypes.bool.isRequired,
  onSetCorrectAnswer: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

RadioInput.defaultProps = {
  disabled: false
};

const CheckboxInput = props => {
  const { isCorrectAnswer, number, onSetCorrectAnswer, disabled } = props;
  return (
    <Input
      addon
      checked={isCorrectAnswer}
      type="checkbox"
      name={`answer-${number}`}
      onChange={onSetCorrectAnswer}
      disabled={disabled}
    />
  );
};

CheckboxInput.propTypes = {
  isCorrectAnswer: PropTypes.bool.isRequired,
  number: PropTypes.number.isRequired,
  onSetCorrectAnswer: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

CheckboxInput.defaultProps = {
  disabled: false
};
