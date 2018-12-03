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
  const peer = new Peer({ debug: 3, secure: true });
  dispatch(setPeer(peer));

  peer.on("error", err => {
    console.error(err);
    dispatch(setServerStatus(3));
  });

  const connection = peer.connect(
    serverId,
    { reliable: true }
  );
  dispatch(addConnection(connection));
  dispatch(setServerStatus(1));

  connection.on("open", () => {
    console.log("Client Connected");
    dispatch(setServerStatus(2));
    connection.on("data", data => {
      console.log("Received data: ", data);
      const msg = JSON.parse(data);
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
