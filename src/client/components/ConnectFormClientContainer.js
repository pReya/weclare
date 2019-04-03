import React from "react";
import { Row } from "reactstrap";
import { connect } from "react-redux";
import ConnectForm from "../../shared/components/ConnectForm";

import { setRemoteServerId, connectToServer } from "../actions/client";
import {
  toggleConnectionBusy,
  clearConnectionError
} from "../../shared/actions/connection";

const mapDispatchToProps = dispatch => ({
  onChangeServerId: newServerId => dispatch(setRemoteServerId(newServerId)),
  onClickConnect: () => dispatch(connectToServer()),
  onToggleConnectionBusy: () => dispatch(toggleConnectionBusy()),
  onClearConnectionError: () => dispatch(clearConnectionError())
});

const mapStateToProps = state => ({
  serverId: state.client.remoteServerId,
  connectionStatus: state.connection.status,
  connectionError: state.connection.errorMsg,
  connectionBusy: state.connection.busy
});

const staticProps = {
  title: "Connect to Server",
  text:
    "Please enter a valid Server ID. You should receive this ID from your instructor.",
  buttonText: "Connect",
  location: "/client/answer",
  busyText: "Connecting...",
  validationError:
    "Must start and end with alphanumeric characters. '-','_' and ' ' allowed in between.",
  isServer: false
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(props => (
  <Row className="justify-content-center">
    <ConnectForm {...props} {...staticProps} />
  </Row>
));
