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
import EditorAnswerInput from "./EditorAnswerInput";
import QuillWrapper from "./QuillWrapper";

const QuestionContent = props => {
  const {
    question,
    selectedQuestion,
    onEditAnswerText,
    onEditQuestionText,
    onEditQuestionMode,
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
          <Form>
            <FormGroup>
              <Row form className="justify-content-between">
                <Label sm="auto">Question Text</Label>
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
                    <Button outline color="primary">
                      Question
                    </Button>
                    <Button outline color="primary">
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
                  Answers{" "}
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
                          onEditQuestionMode(selectedQuestion, "single");
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
                          onEditQuestionMode(selectedQuestion, "multi");
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
                                  <EditorAnswerInput
                                    isCorrectAnswer={answer.isCorrect}
                                    dragHandleProps={
                                      providedDraggable.dragHandleProps
                                    }
                                    selectedQuestion={selectedQuestion}
                                    number={i}
                                    type={question.mode}
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
  onEditQuestionMode: PropTypes.func.isRequired,
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
