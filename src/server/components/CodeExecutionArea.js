import React from "react";
import TerminalWindowContainer from "./TerminalWindowContainer";
import ExecuteCodeButtonContainer from "./ExecuteCodeButtonContainer";

const CodeExecutionArea = props => {
  const { showTerminal, onClickExecute } = props;

  return (
    <>
      {!showTerminal && <ExecuteCodeButtonContainer onClick={onClickExecute} />}
      <TerminalWindowContainer showTerminal={showTerminal} />
    </>
  );
};

export default CodeExecutionArea;
