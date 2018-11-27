import React from "react";
import { Form, FormGroup, Button, Input, Col } from "reactstrap";
import PropTypes from "prop-types";
import DefaultCard from "../../shared/components/DefaultCard";

const ConnectForm = props => {
  const {
    onChangeServerId,
    onClickConnect,
    serverId,
    title,
    text,
    buttonText
  } = props;

  return (
    <DefaultCard title={title} text={text}>
      <Form>
        <FormGroup row className="form-row">
          <Col md={6}>
            <Input
              id="serverId"
              type="text"
              value={serverId}
              onChange={onChangeServerId}
            />
          </Col>
          <Col md={3}>
            <Button
              type="button"
              id="connect"
              className="btn-block"
              onClick={onClickConnect}
            >
              {buttonText}
            </Button>
          </Col>
        </FormGroup>
      </Form>
    </DefaultCard>
  );
};

ConnectForm.propTypes = {
  onChangeServerId: PropTypes.func.isRequired,
  onClickConnect: PropTypes.func.isRequired,
  serverId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired
};

export default ConnectForm;
