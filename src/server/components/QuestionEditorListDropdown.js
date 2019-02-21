import React from "react";
import PropTypes from "prop-types";
import UploadIcon from "mdi-react/UploadIcon";
import FileUploadIcon from "mdi-react/FileUploadIcon";
import DropboxIcon from "mdi-react/DropboxIcon";
import {
  ButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle
} from "reactstrap";
import SingleFileInput from "../../shared/components/SingleFileInput";
import DropboxChooser from "./DropboxChooser";

class QuestionEditorListDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    const { dropdownOpen } = this.state;
    const { onUploadFile, onUploadDropbox } = this.props;
    return (
      <ButtonDropdown isOpen={dropdownOpen} toggle={this.toggle}>
        <DropdownToggle color="light" caret>
          <UploadIcon className="text-secondary" /> Import{" "}
        </DropdownToggle>
        <DropdownMenu>
          <SingleFileInput
            onSelectFile={file => onUploadFile(file)}
            closeDropdown={this.toggle}
          >
            <DropdownItem toggle={false}>
              <FileUploadIcon className="text-secondary" /> File
            </DropdownItem>
          </SingleFileInput>

          <DropdownItem>
            <DropboxChooser
              appKey={process.env.REACT_APP_DROPBOX_APP_KEY}
              linkType="direct"
              success={e => {
                fetch(e[0].link)
                  .then(response => response.text())
                  .then(text => onUploadDropbox(text));
              }}
            >
              <DropboxIcon className="text-secondary" /> Dropbox
            </DropboxChooser>
          </DropdownItem>
        </DropdownMenu>
      </ButtonDropdown>
    );
  }
}

QuestionEditorListDropdown.propTypes = {
  onUploadFile: PropTypes.func.isRequired,
  onUploadDropbox: PropTypes.func.isRequired
};

export default QuestionEditorListDropdown;
