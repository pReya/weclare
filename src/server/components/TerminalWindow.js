import React from "react";

const TerminalWindow = props => {
  const { showTerminal } = props;

  return (
    <div
      style={{ height: "300px", overflow: "scroll" }}
      id="terminal"
      className={`border rounded text-white bg-dark p-3 my-3 ${
        showTerminal ? "d-block" : "d-none"
      }`}
    />
  );
};

export default TerminalWindow;
