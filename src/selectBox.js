import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, CardText, CardBody, CardHeader, CardTitle } from "reactstrap";
import PropTypes from "prop-types";

const SelectBox = props => {
  const { header, title, text, children, icon } = props;
  return (
    <div>
      <Card className="shadow">
        <CardHeader>
          <h4 className="my-0">{header}</h4>
        </CardHeader>
        <CardBody>
          <CardTitle>{title}</CardTitle>
          {/* <FontAwesomeIcon icon={icon} size="6x" color="#8a817c" /> */}
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
  children: "",
  icon: ""
};

SelectBox.propTypes = {
  header: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  children: PropTypes.element,
  icon: PropTypes.element
};

export default SelectBox;
