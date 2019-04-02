import { connect } from "react-redux";
import TerminalWindow from "./TerminalWindow";
import { addLine, resetTerminal } from "../actions/terminal";

const mapDispatchToProps = {
  addLine,
  resetTerminal
};

const mapStateToProps = state => ({
  messages: state.terminal
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TerminalWindow);
