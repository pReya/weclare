import React from "react";
import { Row } from "reactstrap";
import { connect } from "react-redux";
import ConnectForm from "../../shared/components/ConnectForm";

import { setRemoteServerId, connectToServer } from "../actions/client";

const mapDispatchToProps = dispatch => ({
  onChangeServerId: newServerId => dispatch(setRemoteServerId(newServerId)),
  onClickConnect: () => dispatch(connectToServer())
});

const mapStateToProps = state => ({
  serverId: state.client.remoteServerId,
  connectionStatus: state.connection.status
});

const staticProps = {
  title: "Connect to Server",
  text:
    "Please enter a valid Server ID. You should receive this ID from your instructor.",
  buttonText: "Connect",
  location: "/client/answer",
  validationError:
    "Only alphanumeric characters and '-','_' or spaces are allowed."
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(props => (
  <Row className="justify-content-center">
    <ConnectForm {...props} {...staticProps} />
  </Row>
));
