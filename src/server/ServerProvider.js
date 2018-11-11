import React from "react";
import "../scss/App.scss";
import Peer from "peerjs";
import { Redirect } from "react-router-dom";

export const ServerContext = React.createContext();

class ServerProvider extends React.Component {
  static handleData(d, sender) {
    console.log(`Received message from ${sender}: ${d}`);
  }

  constructor() {
    super();

    this.handleOpenPeer = id => {
      console.log(`My peer ID is: ${id}`);
      this.setState({ status: 1 });
      return <Redirect to="/server/questionEditor" push />;
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
      // TODO: This might break the app, if PeerJS server times out
      peer: null,
      // Status: 0(initialized), 1(waiting for connection), 2(at least 1 client connected)
      status: 0,
      connections: [],
      ownServerId: "",
      handleOpenPeer: this.handleOpenPeer,
      handleConnection: this.handleConnection,
      handleChangeServerId: this.handleChangeServerId,
      handleCreatePeer: this.handleCreatePeer
    };

    console.log("Constructor: ", this);
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

export default ServerProvider;
