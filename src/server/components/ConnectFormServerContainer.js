import React from "react";
import { Row } from "reactstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ConnectForm from "../../shared/components/ConnectForm";
import { setServerId, startServer } from "../actions/server";
import {
  toggleConnectionBusy,
  clearConnectionError
} from "../../shared/actions/connection";

const mapDispatchToProps = dispatch => ({
  onChangeServerId: newServerId => dispatch(setServerId(newServerId)),
  onClickConnect: () => {
    dispatch(startServer());
  },
  onToggleConnectionBusy: () => dispatch(toggleConnectionBusy()),
  onClearConnectionError: () => dispatch(clearConnectionError())
});

const mapStateToProps = state => ({
  serverId: state.server.ownServerId,
  connectionStatus: state.connection.status,
  connectionBusy: state.connection.busy,
  connectionError: state.connection.errorMsg
});

const staticProps = {
  title: "Choose a Server ID",
  text:
    "Please pick a server ID that uniquely identifies your quiz session (e.g. 'algorithms_2_2018') or leave it empty to generate a random ID.",
  buttonText: "Create",
  busyText: "Creating...",
  location: "/server/ask",
  validationError:
    "Must start and end with alphanumeric characters. '-','_' and ' ' allowed in between.",
  isServer: true
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(props => (
    <Row className="justify-content-center">
      <ConnectForm {...props} {...staticProps} />
    </Row>
  ))
);
