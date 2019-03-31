import { connect } from "react-redux";
import ExecuteCodeButton from "./ExecuteCodeButton";
import { runCurrentCode } from "../actions/doppio";

const mapDispatchToProps = {
  runCurrentCode
};

export default connect(
  null,
  mapDispatchToProps
)(ExecuteCodeButton);
