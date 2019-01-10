import React from "react";

class SingleFileInput extends React.Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
  }

  handleSubmit = event => {
    const { onFile } = this.props;
    event.preventDefault();
    onFile(this.fileInput.current.files[0]);
  };

  render() {
    const { children } = this.props;

    return (
      <>
        <input
          type="file"
          ref={this.fileInput}
          style={{ display: "none" }}
          onChange={this.handleSubmit}
        />
        <span
          onClick={e => {
            e.preventDefault();
            this.fileInput.current.click();
          }}
        >
          {children}
        </span>
      </>
    );
  }
}

export default SingleFileInput;
