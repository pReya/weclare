import React from "react";
import "react-quill/dist/quill.snow.css";
import "../../shared/scss/quill.scss";
import hljs from "highlight.js/lib/highlight";
import java from "highlight.js/lib/languages/java";
import ReactQuill from "react-quill";
import PropTypes from "prop-types";

class QuillWrapper extends React.Component {
  formats = [
    [
      "bold",
      "italic",
      "underline",
      "code-block",
      "code",
      "list",
      "link",
      "font"
    ],
    ["code-block", "code"]
  ];

  modules = [
    {
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
    },
    {
      toolbar: [["code-block"], ["clean"]],
      syntax: {
        highlight: text => hljs.highlightAuto(text).value
      }
    }
  ];

  constructor(props) {
    super(props);
    this.quillRef = React.createRef();
    this.reactQuillRef = React.createRef();
    hljs.registerLanguage("java", java);
    hljs.configure({ languages: ["java"] });
  }

  componentDidMount() {
    this.attachQuillRefs();
  }

  // componentDidUpdate() {
  //   this.attachQuillRefs();
  // }

  saveRawText = () => {
    console.log("Arrived");
    const { onEditContent } = this.props;
    const rawContent = this.quillRef.getText();
    console.log("Raw content", rawContent);
    onEditContent(rawContent);
  };

  attachQuillRefs() {
    if (typeof this.reactQuillRef.current.getEditor !== "function") return;
    this.quillRef = this.reactQuillRef.current.getEditor();
    console.log("Attached ref", this.quillRef.getText());
  }

  render() {
    const { content, isCodeOnlyEditor, onEditContent } = this.props;

    return (
      <ReactQuill
        ref={this.reactQuillRef}
        className="mb-4"
        id="question"
        value={content}
        formats={this.formats[isCodeOnlyEditor ? 1 : 0]}
        modules={this.modules[isCodeOnlyEditor ? 1 : 0]}
        onChange={isCodeOnlyEditor ? this.saveRawText : onEditContent}
      />
    );
  }
}

QuillWrapper.propTypes = {
  content: PropTypes.string,
  isCodeOnlyEditor: PropTypes.bool,
  onEditContent: PropTypes.func
};

QuillWrapper.defaultProps = {
  content: "",
  isCodeOnlyEditor: false,
  onEditContent: () => null
};

export default QuillWrapper;
