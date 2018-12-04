import React from "react";
import { connect } from "react-redux";
import Header from "../../shared/components/Header";

const mapStateToProps = state => ({
  status: state.connection.status
});

export default connect(mapStateToProps)(props => (
  <Header isClient {...props} />
));
