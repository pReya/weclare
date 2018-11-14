import React from "react";
import "../scss/App.scss";
import PropTypes from "prop-types";
import {
  Badge,
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  ListGroupItemText
} from "reactstrap";

function QuestionList(props) {
  const { questions, onSelect, selectedQuestion } = props;
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
            key={`question-${i}`}
            tag="a"
            href="#"
            onClick={e => {
              e.preventDefault();
              onSelect(i);
            }}
            action
            active={selectedQuestion === i}
          >
            <ListGroupItemText className="mb-0">{q}</ListGroupItemText>
          </ListGroupItem>
        ))}
      </ListGroup>
    </Card>
  );
}

QuestionList.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.string)
};

QuestionList.defaultProps = {
  questions: []
};
export default QuestionList;
