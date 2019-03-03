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
import InfoPopoverIcon from "../../shared/components/InfoPopoverIcon";
import QuestionEditorAnswerInput from "./QuestionEditorAnswerInput";
import QuillWrapper from "./QuillWrapper";

const QuestionEditorContent = props => {
  const {
    question,
    selectedQuestion,
    onEditAnswerText,
    onEditQuestionText,
    onEditQuestionMode,
    onEditQuestionType,
    onAddAnswer,
    onSortAnswer,
    onSetCorrectSingleAnswer,
    onSetCorrectMultiAnswer,
    onDeleteAnswer,
    onDeleteQuestion
  } = props;

  return (
    <Card className="shadow-none">
      <CardHeader>
        <h5 className="my-0">Edit Question</h5>
      </CardHeader>
      <CardBody>
        {selectedQuestion != null ? (
          <Form>
            <FormGroup>
              <Row form className="justify-content-between">
                <Label sm="auto" className="font-weight-bold">
                  Question Text
                </Label>
                <Col sm="auto">
                  <InfoPopoverIcon
                    text={
                      <>
                        A <strong>question</strong> does have a set of correct
                        answers. A <strong>vote</strong> does not have any
                        correct answers. It will just show the distribution of
                        all given answers.
                      </>
                    }
                    id="info-question-type"
                    placement="left"
                  />
                  <ButtonGroup size="sm">
                    <Button
                      outline
                      color="primary"
                      active={question.type === "question"}
                      onClick={() => {
                        if (question.type !== "question") {
                          onEditQuestionType(
                            selectedQuestion,
                            "question",
                            "vote"
                          );
                        }
                      }}
                    >
                      Question
                    </Button>
                    <Button
                      outline
                      color="primary"
                      active={question.type === "vote"}
                      onClick={() => {
                        if (question.type !== "vote") {
                          onEditQuestionType(
                            selectedQuestion,
                            "vote",
                            "question"
                          );
                        }
                      }}
                    >
                      Vote
                    </Button>
                    {/* <Button
                          outline
                          color="primary"
                          onClick={() => {
                            if (question.mode !== "text") {
                              console.log("Passed Text");
                              onEditQuestionMode(selectedQuestion, "text");
                            }
                          }}
                          active={question.mode === "text"}
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
              <Row form className="justify-content-between">
                <Label sm="auto">
                  <span className="font-weight-bold">Answers </span>
                  <span className="small text-muted">
                    {question.mode === "multi"
                      ? "(Check the correct answers)"
                      : "(Select the correct answer)"}
                  </span>
                </Label>

                <Col sm="auto">
                  <InfoPopoverIcon
                    text={
                      <>
                        Choose if you want to allow users to pick just a{" "}
                        <strong>single</strong> or <strong>multiple</strong>{" "}
                        answers.
                      </>
                    }
                    id="info-question-mode"
                    placement="left"
                  />
                  <ButtonGroup size="sm">
                    <Button
                      outline
                      color="primary"
                      onClick={() => {
                        if (question.mode !== "single") {
                          onEditQuestionMode(
                            selectedQuestion,
                            "single",
                            "multi"
                          );
                        }
                      }}
                      active={question.mode === "single"}
                    >
                      Single
                    </Button>
                    <Button
                      outline
                      color="primary"
                      onClick={() => {
                        if (question.mode !== "multi") {
                          onEditQuestionMode(
                            selectedQuestion,
                            "multi",
                            "single"
                          );
                        }
                      }}
                      active={question.mode === "multi"}
                    >
                      Multiple
                    </Button>
                    {/* <Button
                          outline
                          color="primary"
                          onClick={() => {
                            if (question.mode !== "text") {
                              console.log("Passed Text");
                              onEditQuestionMode(selectedQuestion, "text");
                            }
                          }}
                          active={question.mode === "text"}
                        >
                          Text
                        </Button> */}
                  </ButtonGroup>
                </Col>
              </Row>

              <Row form>
                <Col>
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
                                  <QuestionEditorAnswerInput
                                    isCorrectAnswer={answer.isCorrect}
                                    dragHandleProps={
                                      providedDraggable.dragHandleProps
                                    }
                                    selectedQuestion={selectedQuestion}
                                    number={i}
                                    mode={question.mode}
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
                                    disabled={question.type === "vote"}
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
                </Col>
              </Row>
            </FormGroup>

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
          </Form>
        ) : (
          <span className="text-muted">No question selected</span>
        )}
      </CardBody>
    </Card>
  );
};

QuestionEditorContent.propTypes = {
  question: PropTypes.shape({
    type: PropTypes.string,
    text: PropTypes.string,
    answers: PropTypes.arrayOf(PropTypes.object)
  }),
  selectedQuestion: PropTypes.number,
  onEditAnswerText: PropTypes.func.isRequired,
  onEditQuestionText: PropTypes.func.isRequired,
  onEditQuestionMode: PropTypes.func.isRequired,
  onEditQuestionType: PropTypes.func.isRequired,
  onAddAnswer: PropTypes.func.isRequired,
  onSetCorrectSingleAnswer: PropTypes.func.isRequired,
  onSetCorrectMultiAnswer: PropTypes.func.isRequired,
  onDeleteAnswer: PropTypes.func.isRequired,
  onDeleteQuestion: PropTypes.func.isRequired
};

QuestionEditorContent.defaultProps = {
  question: {},
  selectedQuestion: 0
};

export default QuestionEditorContent;