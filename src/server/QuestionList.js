import React from "react";
import "../scss/App.scss";
import PropTypes from "prop-types";
import AddIcon from "@material-ui/icons/Add";
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  ListGroup,
  ListGroupItem,
  ListGroupItemText
} from "reactstrap";

const QuestionList = props => {
  const { questions, onSelect, selectedQuestion, onAddQuestion } = props;
  console.log("QuestionList received questions: ", questions);
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
        {questions.map(q => (
          <ListGroupItem
            key={`question-${q[0]}`}
            tag="a"
            href="#"
            onClick={e => {
              e.preventDefault();
              onSelect(parseInt(q[0], 10));
            }}
            action
            active={selectedQuestion === parseInt(q[0], 10)}
          >
            <ListGroupItemText className="mb-0">
              {q[1].questionText}
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
        <AddIcon className="text-success" style={{ paddingBottom: "3px" }} />
        Add
      </CardFooter>
    </Card>
  );
};

QuestionList.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.array),
  onSelect: PropTypes.func.isRequired,
  selectedQuestion: PropTypes.number,
  onAddQuestion: PropTypes.func.isRequired
};

QuestionList.defaultProps = {
  questions: ["No questions"],
  selectedQuestion: null
};
export default QuestionList;
