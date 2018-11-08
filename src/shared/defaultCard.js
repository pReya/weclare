import React from "react";
import "../scss/App.scss";
import { Card, CardHeader, CardBody, CardText } from "reactstrap";
import PropTypes from "prop-types";

function DefaultCard(props) {
  const { title, text, children } = props;
  return (
    <Card className="shadow">
      <CardHeader>
        <h6 className="my-0">{title}</h6>
      </CardHeader>
      <CardBody>
        <CardText>{text}</CardText>
        {children}
      </CardBody>
    </Card>
  );
}

DefaultCard.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  children: PropTypes.node
};

DefaultCard.defaultProps = {
  children: null
};

export default DefaultCard;
