import React from "react";
import { Card, CardText, CardBody, CardHeader, CardTitle } from "reactstrap";
import PropTypes from "prop-types";

const SelectBox = props => {
  const { header, title, text, button } = props;
  return (
    <div>
      <Card>
        <CardHeader>
          <h4 className="my-0">{header || ""}</h4>
        </CardHeader>
        <CardBody>
          <CardTitle>{title || ""}</CardTitle>
          <CardText>{text || ""}</CardText>
          {button}
        </CardBody>
      </Card>
    </div>
  );
};

SelectBox.defaultProps = {
  header: "",
  title: "",
  text: "",
  button: ""
};

SelectBox.propTypes = {
  header: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  button: PropTypes.string
};

export default SelectBox;
