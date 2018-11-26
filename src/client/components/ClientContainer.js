import React from "react";
import "../scss/App.scss";
import Peer from "peerjs";

const handleData = (d, sender) => {
  console.log(`Received message from ${sender}: ${d}`);
};

const handleConnect = () => {
  const { peer, remoteServerId } = this.state;
  console.log(`Trying to connect to server ${remoteServerId}...`);
  const c = peer.connect(
    remoteServerId,
    { reliable: true }
  );
  this.setState({
    status: 1,
    connection: c
  });

  c.on("open", () => {
    console.log("Connected");
    this.setState({
      status: 2
    });
  });

  c.on("data", this.handleData);
};

class ClientContainer extends React.Component {
  constructor() {
    super();
    this.handleConnect = this.handleConnect.bind(this);
  }

  state = {
    peer: new Peer({ debug: 3, secure: true }),
    status: 0,
    connection: null,
    remoteServerId: ""
  };

  componentDidMount() {
    const { peer } = this.state;
    peer.on("error", err => {
      console.log(err);
      this.setState({
        status: 3
      });
    });
  }
}

export default ClientContainer;
