import React from "react";
import { Row } from "reactstrap";
import { connect } from "react-redux";
import Peer from "peerjs";
import ConnectForm from "../../shared/components/ConnectForm";
import { setServerStatus, setPeer } from "../../shared/actions/connection";
import {
  addConnection,
  setRemoteServerId,
  setCurrentQuestion
} from "../actions/client";

const clickConnect = (serverId, dispatch) => {
  const {
    REACT_APP_PEERJS_SERVER: server,
    REACT_APP_PEERJS_SECURE: secure,
    REACT_APP_PEERJS_DEBUG: debug
  } = process.env;

  const peer = new Peer({
    host: server,
    secure: secure === "true",
    debug: parseInt(debug, 10)
  });

  dispatch(setPeer(peer));

  peer.on("error", err => {
    console.error(err);
    dispatch(setServerStatus(3));
  });

  const connection = peer.connect(
    serverId,
    { reliable: false }
  );
  dispatch(addConnection(connection));
  dispatch(setServerStatus(1));

  connection.on("open", () => {
    console.log("Client Connected");
    dispatch(setServerStatus(2));
    connection.on("data", data => {
      const msg = JSON.parse(data);
      console.log("Received data: ", msg);
      dispatch(setCurrentQuestion(msg.question));
    });
  });
};

const mapDispatchToProps = dispatch => ({
  onChangeServerId: newServerId => dispatch(setRemoteServerId(newServerId)),
  onClickConnect: serverId => clickConnect(serverId, dispatch)
});

const mapStateToProps = state => ({
  serverId: state.client.remoteServerId
});

const staticProps = {
  title: "Connect to Server",
  text:
    "Please enter a valid Server ID. You should receive this ID from your instructor.",
  buttonText: "Connect",
  location: "/client/answer"
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(props => (
  <Row className="justify-content-center">
    <ConnectForm {...props} {...staticProps} />
  </Row>
));
