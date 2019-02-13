import React from "react";
import PropTypes from "prop-types";

class SingleFileInput extends React.Component {
  constructor(props) {
    super(props);
    this.fileInput = React.createRef();
  }

  handleSubmit = event => {
    const { onSelectFile, closeDropdown } = this.props;
    event.preventDefault();
    onSelectFile(this.fileInput.current.files[0]);
    if (typeof closeDropdown === "function") {
      closeDropdown();
    }
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

SingleFileInput.propTypes = {
  onSelectFile: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  closeDropdown: PropTypes.func
};

SingleFileInput.defaultProps = {
  closeDropdown: null
};

export default SingleFileInput;
