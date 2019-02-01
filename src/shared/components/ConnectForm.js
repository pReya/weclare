import React from "react";
import { Form, FormGroup, Button, Input, Col } from "reactstrap";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import DefaultCard from "./DefaultCard";

const ConnectForm = props => {
  console.log(props);
  const {
    match,
    onChangeServerId,
    onClickConnect,
    serverId,
    title,
    text,
    buttonText,
    history,
    location
  } = props;

  if (match && match.params && match.params.serverId) {
    onChangeServerId(match.params.serverId);
  }

  return (
    <DefaultCard title={title} text={text}>
      <Form>
        <FormGroup row className="form-row">
          <Col md={6}>
            <Input
              id="serverId"
              type="text"
              value={serverId}
              onChange={e => onChangeServerId(e.target.value)}
            />
          </Col>
          <Col md={3}>
            <Button
              type="button"
              id="connect"
              className="btn-block"
              onClick={() => {
                onClickConnect(serverId);
                if (history && location) {
                  history.push(location);
                }
              }}
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
  buttonText: PropTypes.string,
  history: ReactRouterPropTypes.history.isRequired,
  location: PropTypes.string.isRequired
};

ConnectForm.defaultProps = {
  buttonText: "Connect"
};

export default ConnectForm;
