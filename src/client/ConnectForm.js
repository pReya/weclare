import React from "react";
import "../scss/App.scss";
import { Form, FormGroup, Button, Label, Input, Col } from "reactstrap";
import PropTypes from "prop-types";

class ConnectForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { onChangeServerId } = this.props;
    onChangeServerId(e.target.value);
  }

  render() {
    const statusDescriptions = [
      "Initialized",
      "Trying to connect",
      "Connected to server"
    ];
    const { status, serverId, onClickConnect } = this.props;
    return (
      <Form>
        <FormGroup row>
          <Label for="status" md={1}>
            Status:
          </Label>
          <Col md={4}>
            <Input
              id="status"
              type="text"
              value={statusDescriptions[status]}
              disabled
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="serverId" md={1}>
            Server:
          </Label>
          <Col md={4}>
            <Input
              id="serverId"
              type="text"
              value={serverId}
              onChange={this.handleChange}
              disabled={status === 2}
            />
          </Col>
          <Col md={4}>
            <Button
              type="button"
              id="connect"
              onClick={onClickConnect}
              disabled={status === 2}
            >
              Connect
            </Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

ConnectForm.propTypes = {
  onChangeServerId: PropTypes.func.isRequired,
  onClickConnect: PropTypes.func.isRequired,
  status: PropTypes.number.isRequired,
  serverId: PropTypes.string.isRequired
};

export default ConnectForm;
