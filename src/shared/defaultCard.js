import React from "react";
import "../scss/App.scss";
import { Card, CardHeader, CardBody, CardText, Col } from "reactstrap";
import PropTypes from "prop-types";

function DefaultCard(props) {
  const { title, text, children } = props;
  return (
    <Col md="8">
      <Card className="shadow">
        <CardHeader>
          <h6 className="my-0">{title}</h6>
        </CardHeader>
        <CardBody>
          <CardText>{text}</CardText>
          {children}
        </CardBody>
      </Card>
    </Col>
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
