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
import DefaultCard from "./DefaultCard";

class ConnectForm extends React.Component {
  state = {
    inputIsInvalid: false,
    isWaitingForServer: false
  };

  setWaitingForServer = () => {
    this.setState(prevState => ({
      ...prevState,
      isWaitingForServer: true
    }));
  };

  validateServerId = id => {
    const serverIdRex = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;
    const isValid = !id || serverIdRex.test(id);
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
      connectionStatus
    } = this.props;

    const { inputIsInvalid, isWaitingForServer } = this.state;

    if (history && location && connectionStatus === 1) {
      history.push(location);
    }

    // React Router: If URL has serverID
    if (match && match.params && match.params.serverId) {
      onChangeServerId(match.params.serverId);
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
                disabled={isWaitingForServer}
                invalid={inputIsInvalid}
                onChange={e => {
                  const newId = e.target.value;
                  this.validateServerId(newId);
                  onChangeServerId(newId);
                }}
              />
              {validationError && (
                <FormFeedback>{validationError}</FormFeedback>
              )}
              {helpText && <FormText>{helpText}</FormText>}
            </Col>
            <Col md={3}>
              <Button
                type="button"
                id="connect"
                className="btn-block"
                size="lg"
                disabled={isWaitingForServer || inputIsInvalid}
                onClick={() => {
                  onClickConnect(serverId);
                  this.setWaitingForServer();
                }}
              >
                {isWaitingForServer ? (
                  <>
                    <Spinner size="sm" color="info" /> Waiting...
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
  inputIsInvalid: PropTypes.bool,
  match: ReactRouterPropTypes.match
};

ConnectForm.defaultProps = {
  helpText: undefined,
  match: undefined,
  buttonText: "Connect",
  validationError: undefined,
  inputIsInvalid: false
};

export default ConnectForm;
