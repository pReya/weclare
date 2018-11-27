import React from "react";
import "../../scss/App.scss";
import { Form, FormGroup, Button, Input, Col, Row } from "reactstrap";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import DefaultCard from "../../shared/components/DefaultCard";

const ServerIdCreator = props => {
  const {
    ownServerId,
    onClickCreate,
    onChangeServerId,
    history,
    location
  } = props;
  return (
    <Row className="justify-content-center">
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
                value={ownServerId}
                onChange={e => {
                  onChangeServerId(e.target.value);
                }}
              />
            </Col>
            <Col md={3}>
              <Button
                type="button"
                id="connect"
                className="btn-block"
                onClick={() => {
                  onClickCreate();
                  if (history && location) {
                    history.push(location);
                  }
                }}
              >
                Create
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </DefaultCard>
    </Row>
  );
};

ServerIdCreator.propTypes = {
  ownServerId: PropTypes.func.isRequired,
  onClickCreate: PropTypes.func.isRequired,
  onChangeServerId: PropTypes.func.isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  location: PropTypes.string.isRequired
};

export default ServerIdCreator;
