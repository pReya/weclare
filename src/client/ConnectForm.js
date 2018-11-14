import React from "react";
import "../scss/App.scss";
import { Form, FormGroup, Button, Input, Col } from "reactstrap";
import PropTypes from "prop-types";
import DefaultCard from "../shared/DefaultCard";

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
    const { serverId, onClickConnect } = this.props;
    return (
      <DefaultCard
        title="Connect to Server"
        text="Please enter a valid Server ID. You should receive this ID from your instructor."
      >
        <Form>
          <FormGroup row className="form-row">
            <Col md={6}>
              <Input
                id="serverId"
                type="text"
                value={serverId}
                onChange={this.handleChange}
              />
            </Col>
            <Col md={3}>
              <Button
                type="button"
                id="connect"
                className="btn-block"
                onClick={onClickConnect}
              >
                Connect
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
  serverId: PropTypes.string.isRequired
};

export default ConnectForm;
