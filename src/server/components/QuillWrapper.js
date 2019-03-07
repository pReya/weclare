import React from "react";
import "react-quill/dist/quill.snow.css";
import "../../shared/scss/quill.scss";
import hljs from "highlight.js";
import ReactQuill from "react-quill";

class QuillWrapper extends React.Component {
  formats = [
    "bold",
    "italic",
    "underline",
    "code-block",
    "code",
    "list",
    "link",
    "font"
  ];

  modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["code-block"],
      ["clean"],
      [{ font: [] }]
    ],
    syntax: {
      highlight: text => hljs.highlightAuto(text).value
    }
  };

  constructor(props) {
    super(props);
    hljs.configure({ languages: ["java"] });
  }

  handleChange = newValue => {
    const { onEditQuestionText, selectedQuestion } = this.props;
    onEditQuestionText(selectedQuestion, newValue);
  };

  render() {
    const { content } = this.props;

    return (
      <ReactQuill
        className="mb-4"
        id="question"
        value={content}
        formats={this.formats}
        modules={this.modules}
        onChange={this.handleChange}
      />
    );
  }
}

export default QuillWrapper;
