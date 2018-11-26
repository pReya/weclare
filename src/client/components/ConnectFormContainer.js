import { connect } from "react-redux";
import Peer from "peerjs";
import ConnectForm from "./ConnectForm";
import { addConnection, setRemoteServerId } from "../actions/client";
import { setPeer, setServerStatus } from "../../shared/actions/connection";

const mapDispatchToProps = dispatch => ({
  onChangeServerId: newServerId => dispatch(setRemoteServerId(newServerId)),
  onClickConnect: ownServerId => dispatch(setRemoteServerId(ownServerId))
});

const mapStateToProps = state => ({
  serverId: state.client.remoteServerId,
  title: "Connect to Server",
  text:
    "Please enter a valid Server ID. You should receive this ID from your instructor.",
  buttonText: "Connect"
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectForm);
