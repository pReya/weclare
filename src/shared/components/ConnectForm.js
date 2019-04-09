import React from "react";
import {
  Form,
  FormText,
  FormFeedback,
  FormGroup,
  Button,
  Input,
  Col,
  Spinner
} from "reactstrap";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import { Redirect } from "react-router-dom";
import DefaultCard from "./DefaultCard";

class ConnectForm extends React.Component {
  state = {
    inputIsInvalid: false
  };

  validateServerId = id => {
    const serverIdRex = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;
    const isValid = serverIdRex.test(id);
    this.setState(prevState => ({ ...prevState, inputIsInvalid: !isValid }));
  };

  render() {
    const {
      match,
      onChangeServerId,
      onClickConnect,
      serverId,
      title,
      text,
      buttonText,
      history,
      location,
      helpText,
      validationError,
      connectionStatus,
      busyText,
      connectionError,
      connectionBusy,
      onToggleConnectionBusy,
      onClearConnectionError,
      isServer
    } = this.props;

    const { inputIsInvalid } = this.state;

    // React Router: If URL has serverID
    if (match && match.params && match.params.serverId) {
      onChangeServerId(match.params.serverId);
    }

    if (history && location && connectionStatus === (isServer ? 1 : 2)) {
      return <Redirect to={location} />;
    }

    return (
      <DefaultCard title={title} text={text}>
        <Form>
          <FormGroup row className="form-row mb-1">
            <Col>
              <Input
                bsSize="lg"
                id="serverId"
                type="text"
                value={serverId}
                disabled={connectionBusy}
                invalid={inputIsInvalid || Boolean(connectionError)}
                onChange={e => {
                  const newId = e.target.value;
                  this.validateServerId(newId);
                  onChangeServerId(newId);
                  if (typeof onClearConnectionError === "function") {
                    onClearConnectionError();
                  }
                }}
              />
              {validationError &&
                inputIsInvalid && (
                  <FormFeedback>{validationError}</FormFeedback>
                )}
              {connectionError && (
                <FormFeedback>{connectionError}</FormFeedback>
              )}
              {helpText && <FormText>{helpText}</FormText>}
            </Col>
            <Col md={4}>
              <Button
                type="button"
                id="connect"
                className="btn-block"
                size="lg"
                disabled={
                  connectionBusy || inputIsInvalid || (!isServer && !serverId)
                }
                onClick={() => {
                  onClickConnect(serverId);
                  if (typeof onToggleConnectionBusy === "function") {
                    onToggleConnectionBusy();
                  }
                }}
              >
                {connectionBusy ? (
                  <>
                    <Spinner size="sm" color="info" /> {busyText}
                  </>
                ) : (
                  buttonText
                )}
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </DefaultCard>
    );
  }
}

ConnectForm.propTypes = {
  onChangeServerId: PropTypes.func.isRequired,
  onClickConnect: PropTypes.func.isRequired,
  serverId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  history: ReactRouterPropTypes.history.isRequired,
  location: PropTypes.string.isRequired,
  helpText: PropTypes.string,
  validationError: PropTypes.string,
  match: ReactRouterPropTypes.match,
  connectionStatus: PropTypes.number,
  busyText: PropTypes.string
};

ConnectForm.defaultProps = {
  helpText: undefined,
  match: undefined,
  buttonText: "Connect",
  validationError: undefined,
  connectionStatus: 0,
  busyText: "Waiting..."
};

export default ConnectForm;
