import React from "react";
import "../scss/App.scss";
import Peer from "peerjs";

class Server extends React.Component {
  state = {
    peer: new Peer({ debug: 3, secure: true, port: 443 }),
    status: "initialized",
    connections: []
  };

  componentDidMount() {
    const { peer, connections } = this.state;
    peer.on("open", id => {
      console.log(`My peer ID is: ${id}`);
      // document.querySelector("#myId").value = id;
      this.setState({ status: "waiting for connection" });
    });
    peer.on("connection", c => {
      c.on("data", data => {
        console.log(`Received message from ?: ${data}`);
      });

      this.setState(prevState => ({
        connections: [...prevState.connections, c]
      }));

      console.log("New connection: ", c);

      // console.log("Current connections:", connections);

      // var newPeer = document.createElement("li");
      // newPeer.innerHTML = c.peer;
      // document.querySelector("#peerList").appendChild(newPeer);
      // document.querySelector("#status").style = "color: green";
      // document.querySelector("#status").value =
      //   conn.length + " Clients connected";
    });
  }

  render() {
    const { status } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Status:
            {status}
          </p>
        </header>
      </div>
    );
  }
}

export default Server;
