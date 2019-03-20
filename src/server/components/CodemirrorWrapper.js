import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import PropTypes from "prop-types";
import "codemirror/theme/eclipse.css";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/clike/clike";

export const CodemirrorWrapper = props => {
  const { content, onEditContent } = props;

  return (
    <CodeMirror
      className="border rounded"
      options={{
        lineNumbers: true,
        theme: "eclipse",
        mode: "text/x-java"
      }}
      value={content}
      onBeforeChange={(editor, data, value) => {
        onEditContent(value);
      }}
    />
  );
};

CodemirrorWrapper.propTypes = {
  content: PropTypes.string,
  onEditContent: PropTypes.func
};

CodemirrorWrapper.defaultProps = {
  content: "",
  onEditContent: () => null
};

export default CodemirrorWrapper;
