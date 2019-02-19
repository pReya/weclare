import React from "react";
import { Row } from "reactstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ConnectForm from "../../shared/components/ConnectForm";
import { setServerId, startServer } from "../actions/server";

const mapDispatchToProps = dispatch => ({
  onChangeServerId: newServerId => dispatch(setServerId(newServerId)),
  onClickConnect: () => {
    dispatch(startServer());
  }
});

const mapStateToProps = state => ({
  serverId: state.server.ownServerId
});

const staticProps = {
  title: "Choose a Server ID",
  text:
    "Please pick a server ID that uniquely identifies your quiz session (e.g. 'algorithms_2_2018') or leave it empty to generate a random ID.",
  buttonText: "Create",
  location: "/server/ask",
  validationError:
    "Only alphanumeric characters and '-','_' or spaces are allowed."
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(props => (
    <Row className="justify-content-center">
      <ConnectForm {...props} {...staticProps} />
    </Row>
  ))
);
