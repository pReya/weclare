import React from "react";
import "../scss/App.scss";
import { Form, FormGroup, Button, Input, Col } from "reactstrap";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import DefaultCard from "../shared/DefaultCard";
import { ServerContext } from "./ServerProvider";

const ServerIdCreator = ({ history }) => (
  <DefaultCard
    title="Create a New Server Id"
    text="Please define your individual Server Id that you can give to participants."
  >
    <ServerContext.Consumer>
      {context => (
        <Form>
          <FormGroup row className="form-row">
            <Col md={6}>
              <Input
                id="serverId"
                type="text"
                value={context.ownServerId}
                onChange={context.handleChangeServerId}
              />
            </Col>
            <Col md={3}>
              <Button
                type="button"
                id="connect"
                className="btn-block"
                onClick={() => {
                  context.handleCreatePeer();
                  history.push("/server/questionEditor");
                }}
              >
                Create
              </Button>
            </Col>
          </FormGroup>
        </Form>
      )}
    </ServerContext.Consumer>
  </DefaultCard>
);

ServerIdCreator.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};
export default withRouter(ServerIdCreator);