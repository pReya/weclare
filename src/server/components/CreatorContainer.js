import React from "react";
import { Row } from "reactstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Peer from "peerjs";
import ConnectForm from "../../shared/components/ConnectForm";
import { addConnection, setServerId } from "../actions/server";
import { setPeer, setServerStatus } from "../../shared/actions/connection";

const createPeer = (ownServerId, dispatch) => {
  const peer = new Peer(ownServerId, { debug: 3, secure: true });
  dispatch(setPeer(peer));

  peer.on("open", () => {
    console.log("Connection Opened");
    dispatch(setServerStatus(1));
  });

  peer.on("connection", connection => {
    connection.on("data", data => console.log(data));
    dispatch(setServerStatus(2));
    dispatch(addConnection(connection));
  });

  peer.on("error", err => {
    console.log("FEHLER: ", err);
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