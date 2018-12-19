import React from "react";
import PropTypes from "prop-types";
import { Input, InputGroup, InputGroupAddon, InputGroupText } from "reactstrap";
import DeleteIcon from "mdi-react/DeleteIcon";
import DragIcon from "mdi-react/DragIcon";
import PencilIcon from "mdi-react/PencilIcon";

class SingleChoiceAnswer extends React.Component {
  state = {
    isHovered: false
  };

  render() {
    const {
      answer,
      number,
      selectedQuestion,
      isCorrectAnswer,
      onEditAnswerText,
      onSetCorrectAnswer,
      onDeleteAnswer,
      dragHandleProps
    } = this.props;
    const { isHovered } = this.state;

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
              <Input
                addon
                checked={isCorrectAnswer}
                type="radio"
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

SingleChoiceAnswer.propTypes = {
  selectedQuestion: PropTypes.number.isRequired,
  answer: PropTypes.string.isRequired,
  onEditAnswerText: PropTypes.func.isRequired,
  number: PropTypes.number.isRequired,
  isCorrectAnswer: PropTypes.bool.isRequired,
  onSetCorrectAnswer: PropTypes.func.isRequired,
  onDeleteAnswer: PropTypes.func.isRequired
};

export default SingleChoiceAnswer;
