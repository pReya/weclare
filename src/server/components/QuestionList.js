import React from "react";
import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AddCircleOutlineIcon from "mdi-react/AddCircleOutlineIcon";

import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  ListGroup,
  ListGroupItem,
  ListGroupItemText
} from "reactstrap";

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

const QuestionList = props => {
  const {
    questions,
    onSelectQuestion,
    selectedQuestion,
    onAddQuestion
  } = props;
  return (
    <Card className="shadow">
      <CardHeader>
        <h6 className="my-0 d-flex justify-content-between">
          Questions{" "}
          <Badge color="dark" pill>
            {questions.length}
          </Badge>
        </h6>
      </CardHeader>
      <DragDropContext onDragEnd={() => console.log("Drag End")}>
        <Droppable droppableId="list">
          {provided => (
            <ListGroup flush>
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {questions.map((q, i) => (
                  <Draggable draggableId={q.id} index={i}>
                    {provided => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <ListGroupItem
                          key={q.id}
                          tag="a"
                          href="#"
                          onClick={e => {
                            e.preventDefault();
                            onSelectQuestion(i);
                          }}
                          action
                          active={selectedQuestion === i}
                        >
                          <ListGroupItemText className="mb-0">
                            {truncate(strip(q.questionText), 6, "...")}
                          </ListGroupItemText>
                        </ListGroupItem>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
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
        className="cardFooterButton"
        onClick={() => {
          onAddQuestion();
        }}
      >
        <AddCircleOutlineIcon
          className="text-success"
          style={{ paddingBottom: "3px" }}
        />
        Add
      </CardFooter>
    </Card>
  );
};

QuestionList.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object),
  selectedQuestion: PropTypes.number,
  onSelectQuestion: PropTypes.func.isRequired,
  onAddQuestion: PropTypes.func.isRequired
};

QuestionList.defaultProps = {
  questions: ["No questions"],
  selectedQuestion: null
};
export default QuestionList;
