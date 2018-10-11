import React from "react";
import { Card, CardText, CardBody, CardHeader, CardTitle } from "reactstrap";
import PropTypes from "prop-types";

const SelectBox = props => {
  const { header, title, text, children } = props;
  return (
    <div>
      <Card>
        <CardHeader>
          <h4 className="my-0">{header}</h4>
        </CardHeader>
        <CardBody>
          <CardTitle>{title}</CardTitle>
          <CardText>{text}</CardText>
          {children}
        </CardBody>
      </Card>
    </div>
  );
};

SelectBox.defaultProps = {
  header: "",
  title: "",
  text: "",
  children: ""
};

SelectBox.propTypes = {
  header: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  children: PropTypes.element
};

export default SelectBox;
