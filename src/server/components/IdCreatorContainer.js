import "../../scss/App.scss";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Peer from "peerjs";
import IdCreator from "./IdCreator";

import {
  setServerStatus,
  addConnection,
  setServerId,
  setPeer
} from "../actions/server";

const createPeer = (ownServerId, dispatch) => {
  const peer = new Peer(ownServerId, { debug: 3, secure: true });
  dispatch(setPeer(peer));

  peer.on("open", () => {
    console.log("Open");
    dispatch(setServerStatus(1));
  });

  peer.on("connection", c => {
    c.on("data", data => console.log(data));
    dispatch(setServerStatus(2));
    dispatch(addConnection(c));
  });
};

const mapDispatchToProps = dispatch => ({
  onChangeServerId: newServerId => dispatch(setServerId(newServerId)),
  onClickCreate: ownServerId => createPeer(ownServerId, dispatch)
});

const mapStateToProps = state => ({
  ownServerId: state.ownServerId,
  location: "/server/questionEditor"
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(IdCreator)
);
