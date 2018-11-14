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
  const { questions, onSelect } = props;
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
          <ListGroupItem key={`question-${i}`} tag="a" onClick={onSelect}>
            <ListGroupItemText>{q}</ListGroupItemText>
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
