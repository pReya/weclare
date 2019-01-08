import React from "react";
import "react-quill/dist/quill.snow.css";
import "../../scss/quill.scss";
import "highlight.js/styles/xcode.css";
import hljs from "highlight.js";
import ReactQuill from "react-quill";

class QuillWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.typingTimeout = null;
  }

  render() {
    const { content, onEditQuestionText, selectedQuestion } = this.props;

    return (
      <ReactQuill
        className="mb-4"
        id="question"
        value={content}
        formats={[
          "bold",
          "italic",
          "underline",
          "code-block",
          "code",
          "list",
          "link"
        ]}
        modules={{
          toolbar: [
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link"],
            ["code-block"],
            ["clean"]
          ],
          syntax: {
            highlight: text => hljs.highlightAuto(text).value
          }
        }}
        onChange={(newValue, delta, source) => {
          if (source === "user") {
            clearTimeout(this.typingTimeout);
            this.typingTimeout = setTimeout(
              () => onEditQuestionText(selectedQuestion, newValue),
              300
            );
          }
        }}
      />
    );
  }
}

export default QuillWrapper;
