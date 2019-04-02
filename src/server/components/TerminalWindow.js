import React from "react";
import PropTypes from "prop-types";

class TerminalWindow extends React.Component {
  static defaultProps = {
    messages: [],
    showTerminal: false
  };

  static propTypes = {
    messages: PropTypes.arrayOf(PropTypes.string),
    showTerminal: PropTypes.bool
  };

  terminalRef = React.createRef();

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.terminalRef.current.scrollTop = this.terminalRef.current.scrollHeight;
  };

  render() {
    const { showTerminal, messages } = this.props;

    return (
      <div
        ref={this.terminalRef}
        style={{ height: "300px", overflow: "auto", whiteSpace: "pre-wrap" }}
        id="terminal"
        className={`border rounded text-white bg-dark p-3 my-3 ${
          showTerminal ? "d-block" : "d-none"
        }`}
      >
        {messages.map((msg, i) => (
          <span key={i}>{msg}</span>
        ))}
      </div>
    );
  }
}

export default TerminalWindow;
