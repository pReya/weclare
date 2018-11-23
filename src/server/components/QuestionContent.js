import React from "react";
import "../../scss/App.scss";
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
    onSetCorrectAnswer,
    onDeleteAnswer,
    onDeleteQuestion
  } = props;
  console.log("QuestionContent received question: ", question);
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
                Question Text
              </Label>
              <Input
                id="question"
                type="text"
                onChange={e =>
                  onEditQuestionText(selectedQuestion, e.target.value)
                }
                value={question.questionText}
              />
            </FormGroup>
            <FormGroup row className="form-row">
              <Label sm={8}>Answers (Check the correct answer)</Label>
              {question.answers.map((a, i) => (
                <SingleChoiceAnswer
                  isCorrectAnswer={question.correctAnswers === i}
                  selectedQuestion={selectedQuestion}
                  number={i}
                  answer={a.answerText}
                  key={i}
                  onEditAnswerText={e => {
                    onEditAnswerText(selectedQuestion, e.target.value, i);
                  }}
                  onSetCorrectAnswer={onSetCorrectAnswer}
                  onDeleteAnswer={onDeleteAnswer}
                />
              ))}
              <Button
                outline
                block
                color="success"
                onClick={() => onAddAnswer(selectedQuestion)}
              >
                Add answer
              </Button>
              <Button
                outline
                block
                color="danger"
                onClick={() => onDeleteQuestion(selectedQuestion)}
              >
                Delete Question
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
    answers: PropTypes.arrayOf(PropTypes.object)
  }),
  selectedQuestion: PropTypes.number,
  onEditAnswerText: PropTypes.func.isRequired,
  onEditQuestionText: PropTypes.func.isRequired,
  onAddAnswer: PropTypes.func.isRequired,
  onSetCorrectAnswer: PropTypes.func.isRequired,
  onDeleteAnswer: PropTypes.func.isRequired,
  onDeleteQuestion: PropTypes.func.isRequired
};

QuestionContent.defaultProps = {
  question: {},
  selectedQuestion: 0
};

const SingleChoiceAnswer = props => {
  const {
    answer,
    number,
    selectedQuestion,
    isCorrectAnswer,
    onEditAnswerText,
    onSetCorrectAnswer,
    onDeleteAnswer
  } = props;
  return (
    <InputGroup className="mb-2">
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
      <InputGroupAddon addonType="append">
        <InputGroupText>
          <Button
            outline
            close
            onClick={() => {
              onDeleteAnswer(selectedQuestion, number);
            }}
          />
        </InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  );
};

SingleChoiceAnswer.propTypes = {
  selectedQuestion: PropTypes.number.isRequired,
  answer: PropTypes.string.isRequired,
  onEditAnswerText: PropTypes.func.isRequired,
  number: PropTypes.number.isRequired,
  isCorrectAnswer: PropTypes.bool.isRequired,
  onSetCorrectAnswer: PropTypes.func.isRequired,
  onDeleteAnswer: PropTypes.func.isRequired
};

export default QuestionContent;
