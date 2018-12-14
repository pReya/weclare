import React from "react";
import "../../scss/App.scss";
import PropTypes from "prop-types";
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

      <ListGroup flush>
        {questions.map((q, i) => (
          <ListGroupItem
            key={i}
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
              {strip(q.questionText)}
            </ListGroupItemText>
          </ListGroupItem>
        ))}
        {questions.length === 0 && (
          <ListGroupItem disabled>
            <ListGroupItemText className="mb-0">No questions</ListGroupItemText>
          </ListGroupItem>
        )}
      </ListGroup>
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
