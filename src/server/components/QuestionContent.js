import React from "react";
import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import PlaylistPlusIcon from "mdi-react/PlaylistPlusIcon";
import DeleteIcon from "mdi-react/DeleteIcon";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Button,
  ButtonGroup,
  Label,
  Row
} from "reactstrap";

import EditorAnswerInput from "./EditorAnswerInput";
import QuillWrapper from "./QuillWrapper";

const QuestionContent = props => {
  const {
    question,
    selectedQuestion,
    onEditAnswerText,
    onEditQuestionText,
    onEditQuestionType,
    onAddAnswer,
    onSortAnswer,
    onSetCorrectSingleAnswer,
    onSetCorrectMultiAnswer,
    onDeleteAnswer,
    onDeleteQuestion
  } = props;

  return (
    <Card className="shadow">
      <CardHeader>
        <h6 className="my-0">Edit Question</h6>
      </CardHeader>
      <CardBody>
        {selectedQuestion != null ? (
          <>
            <Form>
              <FormGroup>
                <Row form className="justify-content-between">
                  <Label for="question" sm={4}>
                    Question Text
                  </Label>
                  <Col sm="auto">
                    <ButtonGroup size="sm">
                      <Button
                        outline
                        color="primary"
                        onClick={() => {
                          if (question.type !== "single") {
                            console.log("Passed Single");
                            onEditQuestionType(selectedQuestion, "single");
                          }
                        }}
                        active={question.type === "single"}
                      >
                        Single
                      </Button>
                      <Button
                        outline
                        color="primary"
                        onClick={() => {
                          if (question.type !== "multi") {
                            console.log("Passed Multi");
                            onEditQuestionType(selectedQuestion, "multi");
                          }
                        }}
                        active={question.type === "multi"}
                      >
                        Multiple
                      </Button>
                      {/* <Button
                          outline
                          color="primary"
                          onClick={() => {
                            if (question.type !== "text") {
                              console.log("Passed Text");
                              onEditQuestionType(selectedQuestion, "text");
                            }
                          }}
                          active={question.type === "text"}
                        >
                          Text
                        </Button> */}
                    </ButtonGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col>
                    <QuillWrapper
                      content={question.text}
                      onEditQuestionText={onEditQuestionText}
                      selectedQuestion={selectedQuestion}
                    />
                  </Col>
                </Row>
              </FormGroup>

              <FormGroup>
                <Label>
                  Answers{" "}
                  <span className="small text-muted">
                    {question.type === "multi"
                      ? "(Check the correct answers)"
                      : "(Select the correct answer)"}
                  </span>
                </Label>
                <DragDropContext
                  onDragEnd={result => {
                    const { destination, source } = result;
                    if (!destination) {
                      return;
                    }

                    if (
                      destination.droppableId === source.droppableId &&
                      destination.index === source.inde
                    ) {
                      return;
                    }

                    onSortAnswer(
                      selectedQuestion,
                      source.index,
                      destination.index
                    );
                  }}
                >
                  <Droppable droppableId="answerList">
                    {providedDroppable => (
                      <div
                        {...providedDroppable.droppableProps}
                        ref={providedDroppable.innerRef}
                      >
                        {question.answers.map((answer, i) => (
                          <Draggable
                            draggableId={answer.id}
                            index={i}
                            key={answer.id}
                          >
                            {providedDraggable => (
                              <div
                                {...providedDraggable.draggableProps}
                                ref={providedDraggable.innerRef}
                                key={answer.id}
                              >
                                <EditorAnswerInput
                                  isCorrectAnswer={answer.isCorrect}
                                  dragHandleProps={
                                    providedDraggable.dragHandleProps
                                  }
                                  selectedQuestion={selectedQuestion}
                                  number={i}
                                  type={question.type}
                                  answer={answer.text}
                                  key={answer.id}
                                  onEditAnswerText={e =>
                                    onEditAnswerText(
                                      selectedQuestion,
                                      e.target.value,
                                      i
                                    )
                                  }
                                  onSetCorrectSingleAnswer={
                                    onSetCorrectSingleAnswer
                                  }
                                  onSetCorrectMultiAnswer={
                                    onSetCorrectMultiAnswer
                                  }
                                  onDeleteAnswer={onDeleteAnswer}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {providedDroppable.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </FormGroup>
              <FormGroup>
                <Button
                  outline
                  block
                  color="primary"
                  onClick={() => onAddAnswer(selectedQuestion)}
                >
                  <PlaylistPlusIcon /> Add answer
                </Button>
                <Button
                  outline
                  block
                  color="danger"
                  onClick={() => onDeleteQuestion(selectedQuestion)}
                >
                  <DeleteIcon /> Delete Question
                </Button>
              </FormGroup>
            </Form>
          </>
        ) : (
          "No question selected"
        )}
      </CardBody>
    </Card>
  );
};

QuestionContent.propTypes = {
  question: PropTypes.shape({
    type: PropTypes.string,
    text: PropTypes.string,
    answers: PropTypes.arrayOf(PropTypes.object)
  }),
  selectedQuestion: PropTypes.number,
  onEditAnswerText: PropTypes.func.isRequired,
  onEditQuestionText: PropTypes.func.isRequired,
  onEditQuestionType: PropTypes.func.isRequired,
  onAddAnswer: PropTypes.func.isRequired,
  onSetCorrectSingleAnswer: PropTypes.func.isRequired,
  onSetCorrectMultiAnswer: PropTypes.func.isRequired,
  onDeleteAnswer: PropTypes.func.isRequired,
  onDeleteQuestion: PropTypes.func.isRequired
};

QuestionContent.defaultProps = {
  question: {},
  selectedQuestion: 0
};

export default QuestionContent;
