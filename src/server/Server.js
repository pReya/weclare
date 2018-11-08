import React from "react";
import "../scss/App.scss";
import Peer from "peerjs";
import { Container, Row, Col } from "reactstrap";
import { Route, Redirect } from "react-router-dom";
import Footer from "../shared/footer";
import Header from "../shared/header";

import ServerIdCreator from "./ServerIdCreator";

class Server extends React.Component {
  static handleData(d, sender) {
    console.log(`Received message from ${sender}: ${d}`);
  }

  constructor() {
    super();
    this.handleOpen = this.handleOpen.bind(this);
    this.handleConnection = this.handleConnection.bind(this);
    this.handleCreateId = this.handleCreateId.bind(this);
  }

  state = {
    // TODO: This might break the app, if PeerJS server times out
    peer: null,
    // Status: 0(initialized), 1(waiting for connection), 2(at least 1 client connected)
    status: 0,
    connections: [],
    ownServerId: ""
  };

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

  handleCreateId() {
    const { ownServerId } = this.state;
    console.log("arrived in handleCreatId");
    const peer = new Peer(ownServerId, { debug: 3, secure: true });
    this.setState({ peer });

    peer.on("open", this.handleOpen);
    peer.on("connection", this.handleConnection);
    return <Redirect to="/" />;
  }

  render() {
    const { ownServerId, connections, status } = this.state;
    return (
      <div>
        <Header status={status} isServer numberOfClients={connections.length} />
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <Route
                path="/server/createId"
                render={() => (
                  <ServerIdCreator
                    serverId={ownServerId}
                    onChangeServerId={id => this.setState({ ownServerId: id })}
                    onClickCreateId={this.handleCreateId}
                  />
                )}
              />
            </Col>
          </Row>
          <Footer />
        </Container>
      </div>
    );
  }
}

export default Server;
