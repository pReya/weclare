import React from "react";
import "../scss/App.scss";
import Peer from "peerjs";
import PropTypes from "prop-types";
import Logger from "../util/Logger";

export const ServerContext = React.createContext();

class ServerProvider extends React.Component {
  static handleData(d, sender) {
    Logger.info(`Received message from ${sender}: ${d}`);
  }

  static propTypes = {
    children: PropTypes.node.isRequired
  };

  state = {
    peer: null,
    status: 0,
    connections: [],
    ownServerId: ""
  };

  handleOpenPeer = id => {
    Logger.info(`My peer ID is: ${id}`);
    this.setState({ status: 1 });
  };

  createConnection = c => {
    c.on("data", data => this.handleData(data, c.peer));
    this.setState(prevState => ({
      status: 2,
      connections: [...prevState.connections, c]
    }));
  };

  changeServerId = id => {
    this.setState({ ownServerId: id });
  };

  createPeer = () => {
    const { ownServerId } = this.state;
    const peer = new Peer(ownServerId, { debug: 3, secure: true });
    this.setState({ peer });

    peer.on("open", this.handleOpenPeer);
    peer.on("connection", this.handleConnection);
    peer.on("error", this.handleConnection);
  };

  render() {
    const { children } = this.props;
    return (
      <ServerContext.Provider
        value={{
          ...this.state,
          changeServerId: this.changeServerId,
          createPeer: this.createPeer
        }}
      >
        {children}
      </ServerContext.Provider>
    );
  }
}

export default ServerProvider;
