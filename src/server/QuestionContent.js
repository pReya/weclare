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

export default props => {
  const {
    question,
    selectedQuestion,
    onEditAnswer,
    onEditQuestion,
    onAddAnswer
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
                onChange={e => onEditQuestion(e.target.value)}
                value={question.questionText}
              />
            </FormGroup>
            <FormGroup row className="form-row">
              <Label sm={2}>Answers</Label>
              {Object.values(question.answers).map((a, i) => (
                <SingleChoiceAnswer
                  answer={a.answerText}
                  key={`answer-${i}`}
                  onChange={e => {
                    onEditAnswer(e.target.value, i + 1);
                  }}
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

const SingleChoiceAnswer = props => {
  const { answer, onChange } = props;
  return (
    <InputGroup className="mb-2">
      <InputGroupAddon addonType="prepend">
        <InputGroupText>
          <Input
            addon
            type="radio"
            value={answer.answerText}
            onChange={e => {}}
          />
        </InputGroupText>
      </InputGroupAddon>
      <Input value={answer} onChange={onChange} />
      <InputGroupAddon addonType="append">
        <InputGroupText>
          <Button outline close />
        </InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  );
};
