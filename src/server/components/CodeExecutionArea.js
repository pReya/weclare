import React from "react";
import TerminalWindow from "./TerminalWindow";
import ExecuteCodeButtonContainer from "./ExecuteCodeButtonContainer";

const CodeExecutionArea = props => {
  const { showTerminal, onClickExecute } = props;

  return (
    <>
      {!showTerminal && <ExecuteCodeButtonContainer onClick={onClickExecute} />}
      <TerminalWindow showTerminal={showTerminal} />
    </>
  );
};

export default CodeExecutionArea;
