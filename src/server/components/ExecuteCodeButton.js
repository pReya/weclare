import React from "react";
import { Button } from "reactstrap";
import CodeTagsIcon from "mdi-react/CodeTagsIcon";

const ExecuteCodeButton = props => {
  const { onClick, runCurrentCode } = props;

  return (
    <Button
      color="primary"
      outline
      block
      onClick={() => {
        runCurrentCode();
        onClick();
      }}
    >
      <CodeTagsIcon /> Execute Interactive Code Snippet
    </Button>
  );
};

export default ExecuteCodeButton;
