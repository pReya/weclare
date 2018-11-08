import React from "react";
import "../scss/App.scss";
import { Form, FormGroup, Button, Input, Col } from "reactstrap";
import PropTypes from "prop-types";
import DefaultCard from "../shared/defaultCard";

class ServerIdCreator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { onChangeServerId } = this.props;
    onChangeServerId(e.target.value);
  }

  render() {
    const { serverId, onClickCreateId } = this.props;
    return (
      <DefaultCard
        title="Create a New Server Id"
        text="Please define your individual Server Id that you can give to participants."
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
                onClick={onClickCreateId}
              >
                Create
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </DefaultCard>
    );
  }
}

ServerIdCreator.propTypes = {
  onChangeServerId: PropTypes.func.isRequired,
  onClickCreateId: PropTypes.func.isRequired,
  serverId: PropTypes.string.isRequired
};

export default ServerIdCreator;
