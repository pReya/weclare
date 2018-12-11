import React from "react";
import { Row } from "reactstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Peer from "peerjs";
import Logger from "../../shared/util/Logger";
import ConnectForm from "../../shared/components/ConnectForm";
import { addConnection, setServerId } from "../actions/server";
import { registerAnswer } from "../actions/answers";
import { setPeer, setServerStatus } from "../../shared/actions/connection";

const dataHandler = (data, dispatch) => {
  const { type, payload } = data;
  Logger.info("Received Data: ", data);
  switch (type) {
    case "answer":
      console.log("Received answer", payload);
      dispatch(
        registerAnswer(payload.questionIdx, payload.answerIdx, payload.userId)
      );
      break;
    default:
      console.log("Default");
  }
};

const createPeer = (ownServerId, dispatch) => {
  const {
    REACT_APP_PEERJS_SERVER: server,
    REACT_APP_PEERJS_SECURE: secure,
    REACT_APP_PEERJS_DEBUG: debug
  } = process.env;
  const peer = new Peer(ownServerId, {
    host: server,
    secure: secure === "true",
    debug: parseInt(debug, 10)
  });
  dispatch(setPeer(peer));

  peer.on("open", id => {
    Logger.info("Successfully created Peer with id ", id);
    dispatch(setServerStatus(1));
  });

  peer.on("connection", connection => {
    Logger.info("New client connected with id: ", connection.peer);
    connection.on("data", data => dataHandler(data, dispatch));
    dispatch(setServerStatus(2));
    dispatch(addConnection(connection));
  });

  peer.on("error", err => {
    Logger.error("FEHLER: ", err);
    dispatch(setServerStatus(3));
  });
};

const mapDispatchToProps = dispatch => ({
  onChangeServerId: newServerId => dispatch(setServerId(newServerId)),
  onClickConnect: ownServerId => {
    createPeer(ownServerId, dispatch);
  }
});

const mapStateToProps = state => ({
  serverId: state.server.ownServerId
});

const staticProps = {
  title: "Create a New Server Id",
  text:
    "Please define your individual Server Id that you can give to participants.",
  buttonText: "Create",
  location: "/server/wait"
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
