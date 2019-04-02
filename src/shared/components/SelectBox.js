import React from "react";
import { Card, CardText, CardBody, CardHeader } from "reactstrap";
import PropTypes from "prop-types";

const SelectBox = props => {
  const { header, text, children, emoji } = props;
  return (
    <Card className="shadow-none">
      <CardHeader>
        <h4 className="my-0">{header}</h4>
      </CardHeader>
      <CardBody className="d-flex flex-column">
        <CardText>
          <span
            role="img"
            aria-label="Student"
            className="d-block"
            style={{ fontSize: "4em" }}
          >
            {emoji}
          </span>

          <span>{text}</span>
        </CardText>
        {children}
      </CardBody>
    </Card>
  );
};

SelectBox.defaultProps = {
  header: "",
  text: "",
  children: "",
  emoji: ""
};

SelectBox.propTypes = {
  emoji: PropTypes.string,
  header: PropTypes.string,
  text: PropTypes.string,
  children: PropTypes.element
};

export default SelectBox;
