import React from "react";
import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import AddCircleOutlineIcon from "mdi-react/AddCircleOutlineIcon";
import DragIcon from "mdi-react/DragIcon";
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
    onSortQuestion,
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
        <Droppable droppableId="list">
          {provided => (
            <ListGroup flush>
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {questions.map((q, i) => (
                  <Draggable draggableId={q.id} index={i} key={q.id}>
                    {provided2 => (
                      <div
                        {...provided2.draggableProps}
                        ref={provided2.innerRef}
                        key={q.id}
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
                          className="d-flex justify-content-between align-items-center hover"
                        >
                          {truncate(strip(q.questionText), 6, "...")}
                          <div
                            className="hover__hover"
                            {...provided2.dragHandleProps}
                          >
                            <DragIcon style={{ paddingBottom: "3px" }} />
                          </div>
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
