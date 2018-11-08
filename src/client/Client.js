import React from "react";
import "../scss/App.scss";
import Peer from "peerjs";

import { Container, Row, Col } from "reactstrap";
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

  handleConnect() {
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
  }

  render() {
    const { status, remoteServerId } = this.state;
    return (
      <div>
        <Header status={status} componentRole="client" />
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <ConnectForm
                serverId={remoteServerId}
                onChangeServerId={id => this.setState({ remoteServerId: id })}
                onClickConnect={this.handleConnect}
              />
            </Col>
          </Row>
          <Footer />
        </Container>
      </div>
    );
  }
}

export default Client;
