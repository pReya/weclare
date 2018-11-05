import React from "react";
import "../scss/App.scss";
import Peer from "peerjs";

import { Container } from "reactstrap";
import Footer from "../shared/footer";
import Header from "../shared/header";

import ConnectForm from "./ConnectForm";

class Client extends React.Component {
  static handleData(d, sender) {
    console.log(`Received message from ${sender}: ${d}`);
  }

  constructor() {
    super();
    this.handleConnect = this.handleConnect.bind(this);
  }

  state = {
    peer: new Peer({ debug: 3, secure: true, port: 443 }),
    // Status: 0(initialized), 1(Trying to connect), 2(Connected)
    status: 0,
    connection: null,
    serverId: ""
  };

  handleConnect() {
    const { peer, serverId } = this.state;
    console.log(`Trying to connect to server ${serverId}...`);
    const c = peer.connect(serverId);
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
  }

  render() {
    const { status, serverId } = this.state;
    return (
      <div>
        <Header />
        <Container>
          <ConnectForm
            status={status}
            serverId={serverId}
            onChangeServerId={id => this.setState({ serverId: id })}
            onClickConnect={this.handleConnect}
          />
          <Footer />
        </Container>
      </div>
    );
  }
}

export default Client;
