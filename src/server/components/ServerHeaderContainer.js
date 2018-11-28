import React from "react";
import { connect } from "react-redux";
import Header from "../../shared/components/Header";

const mapStateToProps = state => ({
  status: state.connection.status,
  numberOfClients: state.connection.peer
    ? Object.keys(state.connection.peer.connections).length
    : null
});

export default connect(mapStateToProps)(props => (
  <Header isServer {...props} />
));
