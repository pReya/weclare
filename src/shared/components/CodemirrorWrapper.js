import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import PropTypes from "prop-types";
import "codemirror/theme/eclipse.css";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/clike/clike";

const CodemirrorWrapper = props => {
  const { content, onEditContent, readOnly = false } = props;

  return (
    <CodeMirror
      className="border rounded overflow-hidden mb-4"
      options={{
        readOnly,
        lineNumbers: true,
        theme: "eclipse",
        mode: "text/x-java",
        viewportMargin: Infinity
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
  onEditContent: PropTypes.func,
  readOnly: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
};

CodemirrorWrapper.defaultProps = {
  content: "",
  onEditContent: () => null,
  readOnly: false
};

export default CodemirrorWrapper;
