import React from "react";
import { Row } from "reactstrap";
import { connect } from "react-redux";
import Peer from "peerjs";
import ConnectForm from "../../shared/components/ConnectForm";
import Logger from "../../shared/util/Logger";
import { setConnectionStatus, setPeer } from "../../shared/actions/connection";
import {
  addConnection,
  setRemoteServerId,
  setCurrentQuestion
} from "../actions/client";

// Source: https://github.com/peers/peerjs/issues/227#issue-39009356
const makePeerHeartbeater = peer => {
  let timeoutId = 0;
  function heartbeat() {
    timeoutId = setTimeout(heartbeat, 20000);
    // eslint-disable-next-line
    if (peer.socket._wsOpen()) {
      peer.socket.send({ type: "HEARTBEAT" });
      Logger.info("Sent heartbeat");
    }
  }
  // Start
  heartbeat();
  // return
  return {
    start() {
      if (timeoutId === 0) {
        heartbeat();
      }
    },
    stop() {
      clearTimeout(timeoutId);
      timeoutId = 0;
    }
  };
};

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

  const heartbeater = makePeerHeartbeater(peer);

  dispatch(setPeer(peer));

  peer.on("error", err => {
    console.error(err);
    dispatch(setConnectionStatus(3));
  });

  const connection = peer.connect(
    serverId,
    { reliable: false }
  );
  dispatch(addConnection(connection));
  dispatch(setConnectionStatus(1));

  connection.on("open", () => {
    console.log("Client Connected");
    dispatch(setConnectionStatus(2));
    connection.on("data", data => {
      const msg = JSON.parse(data);
      console.log("Received data: ", msg);
      dispatch(setCurrentQuestion(msg));
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
  location: "/client/answer",
  validationError: "Only alphanumeric characters and -,_ or spaces are allowed."
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(props => (
  <Row className="justify-content-center">
    <ConnectForm {...props} {...staticProps} />
  </Row>
));
