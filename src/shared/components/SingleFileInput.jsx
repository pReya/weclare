import React from "react";

class SingleFileInput extends React.Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
  }

  handleSubmit = event => {
    const { onSelectFile } = this.props;
    event.preventDefault();
    onSelectFile(this.fileInput.current.files[0]);
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
        {React.cloneElement(children, {
          onClick: e => {
            e.preventDefault();
            this.fileInput.current.click();
          }
        })}
      </>
    );
  }
}

export default SingleFileInput;
