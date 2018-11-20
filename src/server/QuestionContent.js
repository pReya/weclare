import React from "react";
import "../scss/App.scss";
import PropTypes from "prop-types";
import {
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label
} from "reactstrap";

const QuestionContent = props => {
  const {
    question,
    selectedQuestion,
    onEditAnswerText,
    onEditQuestionText,
    onAddAnswer,
    onEditCorrectAnswer,
    onDeleteAnswer
  } = props;
  return (
    <Card className="shadow">
      <CardHeader>
        <h6 className="my-0">Edit Question</h6>
      </CardHeader>
      <CardBody>
        {selectedQuestion != null ? (
          <Form>
            <FormGroup row className="form-row">
              <Label for="question" sm={2}>
                Question
              </Label>
              <Input
                id="question"
                type="text"
                onChange={e => onEditQuestionText(e.target.value)}
                value={question.questionText}
              />
            </FormGroup>
            <FormGroup row className="form-row">
              <Label sm={2}>Answers</Label>
              {Object.values(question.answers).map((a, i) => (
                <SingleChoiceAnswer
                  correctAnswer={question.correctAnswer === i + 1}
                  number={i + 1}
                  answer={a.answerText}
                  key={`answer-${i}`}
                  onEditAnswerText={e => {
                    onEditAnswerText(e.target.value, i + 1);
                  }}
                  onEditCorrectAnswer={onEditCorrectAnswer}
                  onDeleteAnswer={onDeleteAnswer}
                />
              ))}
              <Button outline block color="success" onClick={onAddAnswer}>
                Add answer
              </Button>
            </FormGroup>
          </Form>
        ) : (
          "No question selected"
        )}
      </CardBody>
    </Card>
  );
};

QuestionContent.propTypes = {
  question: PropTypes.shape({
    questionType: PropTypes.string,
    questionText: PropTypes.string,
    answers: PropTypes.object
  }),
  selectedQuestion: PropTypes.number,
  onEditAnswerText: PropTypes.func.isRequired,
  onEditQuestionText: PropTypes.func.isRequired,
  onAddAnswer: PropTypes.func.isRequired,
  onEditCorrectAnswer: PropTypes.func.isRequired
};

QuestionContent.defaultProps = {
  question: {},
  selectedQuestion: 0
};

const SingleChoiceAnswer = props => {
  const {
    answer,
    onEditAnswerText,
    number,
    correctAnswer,
    onEditCorrectAnswer,
    onDeleteAnswer
  } = props;
  return (
    <InputGroup className="mb-2">
      <InputGroupAddon addonType="prepend">
        <InputGroupText>
          <Input
            addon
            checked={correctAnswer}
            type="radio"
            name="answer"
            onChange={() => {
              onEditCorrectAnswer(number);
            }}
          />
        </InputGroupText>
      </InputGroupAddon>
      <Input value={answer} onChange={onEditAnswerText} />
      <InputGroupAddon addonType="append">
        <InputGroupText>
          <Button outline close onClick={() => onDeleteAnswer(number)} />
        </InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  );
};

SingleChoiceAnswer.propTypes = {
  answer: PropTypes.string.isRequired,
  onEditAnswerText: PropTypes.func.isRequired,
  number: PropTypes.number.isRequired,
  correctAnswer: PropTypes.bool.isRequired,
  onEditCorrectAnswer: PropTypes.func.isRequired
};

export default QuestionContent;
