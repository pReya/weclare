import React from "react";
import { Card, CardHeader, CardBody, CardText, Col, Badge } from "reactstrap";
import PropTypes from "prop-types";

function DefaultCard(props) {
  const { title, text, children, badge } = props;

  return (
    <Col md="8">
      <Card className="shadow">
        <CardHeader>
          {badge ? (
            <h6 className="my-0 d-flex justify-content-between">
              {title}
              <Badge color="dark" pill>
                {badge}
              </Badge>
            </h6>
          ) : (
            <h6 className="my-0">{title}</h6>
          )}
        </CardHeader>
        <CardBody>
          {text && <CardText>{text}</CardText>}
          {children}
        </CardBody>
      </Card>
    </Col>
  );
}

DefaultCard.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  badge: PropTypes.string,
  children: PropTypes.node
};

DefaultCard.defaultProps = {
  text: null,
  children: null,
  badge: null
};

export default DefaultCard;
