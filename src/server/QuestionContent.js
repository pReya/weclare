import React from "react";
import "../scss/App.scss";
import PropTypes from "prop-types";
import {
  Card,
  CardBody,
  CardText,
  CardHeader,
  Form,
  FormGroup,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Col,
  Label
} from "reactstrap";

export default props => {
  const { question, onEditQuestion, selectedQuestion } = props;
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
                Question
              </Label>
              <Input
                id="question"
                type="text"
                onChange={e =>
                  onEditQuestion({
                    text: e.target.value,
                    answers: question.answers
                  })
                }
                value={question.questionText}
              />
            </FormGroup>
            <FormGroup row className="form-row">
              <Label sm={2}>Answers</Label>
              {Object.values(question.answers).map((a, i) => (
                <SingleChoiceAnswer answer={a.answerText} key={`answer-${i}`} />
              ))}
              <Button outline block color="success">
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
  const { answer } = props;
  return (
    <InputGroup className="mb-2">
      <InputGroupAddon addonType="prepend">
        <InputGroupText>
          <Input
            addon
            type="radio"
            value={answer.answerText}
            onChange={e => {
              /* onEditQuestion({
                text: e.target.value,
                answers: question.answers
              }) */
            }}
          />
        </InputGroupText>
      </InputGroupAddon>
      <Input value={answer} />
      <InputGroupAddon addonType="append">
        <InputGroupText>
          <Button outline close />
        </InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  );
};
