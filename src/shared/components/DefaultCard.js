import React from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  CardText,
  Col,
  Badge
} from "reactstrap";
import PropTypes from "prop-types";

function DefaultCard(props) {
  const { title, text, children, badge, footer } = props;

  return (
    <Col md="8">
      <Card className="shadow-none">
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
        {footer && <CardFooter>{footer}</CardFooter>}
      </Card>
    </Col>
  );
}

DefaultCard.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string,
  badge: PropTypes.string,
  children: PropTypes.node,
  footer: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
};

DefaultCard.defaultProps = {
  text: null,
  children: null,
  badge: null,
  footer: null
};

export default DefaultCard;
