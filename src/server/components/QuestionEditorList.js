import React from "react";
import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AddCircleOutlineIcon from "mdi-react/AddCircleOutlineIcon";
import DownloadIcon from "mdi-react/DownloadIcon";
import DragIcon from "mdi-react/DragIcon";
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardFooter,
  ListGroup,
  ListGroupItem,
  ListGroupItemText
} from "reactstrap";
import QuestionEditorListDropdown from "./QuestionEditorListDropdown";

const truncate = (text, limit, after) => {
  const words = text.trim().split(" ");

  if (words.length > limit) {
    return words.slice(0, limit).join(" ") + (after || "");
  }
  return text;
};

const strip = html => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

const QuestionEditorList = props => {
  const {
    questions,
    onSelectQuestion,
    onSortQuestion,
    selectedQuestion,
    onAddQuestion,
    onDownloadFile,
    onUploadFile,
    onUploadDropbox
  } = props;

  return (
    <Card className="shadow-none">
      <CardHeader>
        <h5 className="my-0 d-flex justify-content-between">
          Questions
          <Badge color="dark" pill>
            {questions.length}
          </Badge>
        </h5>
      </CardHeader>
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
          onSortQuestion(source.index, destination.index);
        }}
      >
        <Droppable droppableId="questionList">
          {providedDroppable => (
            <ListGroup flush>
              <div
                {...providedDroppable.droppableProps}
                ref={providedDroppable.innerRef}
              >
                {questions.map((question, i) => (
                  <Draggable
                    draggableId={question.id}
                    index={i}
                    key={question.id}
                  >
                    {providedDraggable => (
                      <div
                        {...providedDraggable.draggableProps}
                        ref={providedDraggable.innerRef}
                        key={question.id}
                      >
                        <ListGroupItem
                          key={question.id}
                          tag="a"
                          href="#"
                          onClick={e => {
                            e.preventDefault();
                            onSelectQuestion(i);
                          }}
                          action
                          active={selectedQuestion === i}
                          className="d-flex justify-content-between align-items-center hover-container"
                        >
                          {truncate(strip(question.text), 7, "...")}
                          <div
                            className="hover-hide"
                            {...providedDraggable.dragHandleProps}
                            style={{ width: "22px", height: "22px" }}
                          >
                            <DragIcon
                              style={{
                                marginRight: "-6px"
                              }}
                            />
                          </div>
                        </ListGroupItem>
                      </div>
                    )}
                  </Draggable>
                ))}
                {providedDroppable.placeholder}
              </div>
              {questions.length === 0 && (
                <ListGroupItem disabled>
                  <ListGroupItemText className="mb-0">
                    No questions
                  </ListGroupItemText>
                </ListGroupItem>
              )}
            </ListGroup>
          )}
        </Droppable>
      </DragDropContext>
      <CardFooter
        tag="button"
        className="cardFooterButton btn btn-light"
        onClick={() => {
          onAddQuestion();
        }}
      >
        <AddCircleOutlineIcon
          className="text-success"
          style={{ paddingBottom: "3px" }}
        />
        Add Question
      </CardFooter>
      <CardFooter>
        <div className="text-center">
          <QuestionEditorListDropdown
            onUploadFile={onUploadFile}
            onUploadDropbox={onUploadDropbox}
          />
          <Button
            color="light"
            onClick={onDownloadFile}
            disabled={questions.length === 0}
          >
            <DownloadIcon className="text-secondary" /> Export
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

QuestionEditorList.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object),
  selectedQuestion: PropTypes.number,
  onSelectQuestion: PropTypes.func.isRequired,
  onAddQuestion: PropTypes.func.isRequired
};

QuestionEditorList.defaultProps = {
  questions: [],
  selectedQuestion: null
};
export default QuestionEditorList;
