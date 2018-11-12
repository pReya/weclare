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

  constructor() {
    super();

    this.handleOpenPeer = id => {
      Logger.info(`My peer ID is: ${id}`);
      this.setState({ status: 1 });
    };

    this.handleConnection = c => {
      c.on("data", data => this.handleData(data, c.peer));
      this.setState(prevState => ({
        status: 2,
        connections: [...prevState.connections, c]
      }));
    };

    this.handleChangeServerId = e => {
      this.setState({ ownServerId: e.target.value });
    };

    this.handleCreatePeer = () => {
      const { ownServerId } = this.state;
      const peer = new Peer(ownServerId, { debug: 3, secure: true });
      this.setState({ peer });

      peer.on("open", this.handleOpenPeer);
      peer.on("connection", this.handleConnection);
    };

    this.state = {
      peer: null,
      status: 0,
      connections: [],
      ownServerId: "",
      handleOpenPeer: this.handleOpenPeer,
      handleConnection: this.handleConnection,
      handleChangeServerId: this.handleChangeServerId,
      handleCreatePeer: this.handleCreatePeer
    };
  }

  render() {
    const { children } = this.props;
    return (
      <ServerContext.Provider value={this.state}>
        {children}
      </ServerContext.Provider>
    );
  }
}

ServerProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default ServerProvider;
