import React from "react";
import "../scss/App.scss";
import Peer from "peerjs";

class Server extends React.Component {
  static handleData(d, sender) {
    console.log(`Received message from ${sender}: ${d}`);
  }

  constructor() {
    super();
    this.handleOpen = this.handleOpen.bind(this);
    this.handleConnection = this.handleConnection.bind(this);
  }

  state = {
    peer: new Peer({ debug: 3, secure: true, port: 443 }),
    // Status: 0(initialized), 1(waiting for connection), 2(at least 1 client connected)
    status: 0,
    connections: []
  };

  componentDidMount() {
    const { peer } = this.state;
    peer.on("open", this.handleOpen);
    peer.on("connection", this.handleConnection);
  }

  handleOpen(id) {
    console.log(`My peer ID is: ${id}`);
    // document.querySelector("#myId").value = id;
    this.setState({ status: 1 });
  }

  handleConnection(c) {
    c.on("data", data => this.handleData(data, c.peer));
    this.setState(prevState => ({
      status: 2,
      connections: [...prevState.connections, c]
    }));

    console.log(`New client ${c.peer} connected`);
    // console.log("Current connections:", connections);

    // var newPeer = document.createElement("li");
    // newPeer.innerHTML = c.peer;
    // document.querySelector("#peerList").appendChild(newPeer);
    // document.querySelector("#status").style = "color: green";
    // document.querySelector("#status").value =
    //   conn.length + " Clients connected";
  }

  render() {
    const statusDescriptions = [
      "Initialized",
      "Waiting for connections",
      "Client(s) connected"
    ];
    const { status, connections } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Status: {connections.length ? connections.length : ""}{" "}
            {statusDescriptions[status]}
          </p>
        </header>
      </div>
    );
  }
}

export default Server;
