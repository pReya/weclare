import React, { Component } from "react";
import PropTypes from "prop-types";
import loadScript from "load-script";

const DROPBOX_SDK_URL = "https://www.dropbox.com/static/api/2/dropins.js";
const SCRIPT_ID = "dropboxjs";

let scriptLoadingStarted = false;

// read more
// https://www.dropbox.com/developers/chooser
export default class DropboxChooser extends Component {
  static propTypes = {
    children: PropTypes.node,
    appKey: PropTypes.string.isRequired,
    success: PropTypes.func.isRequired,
    cancel: PropTypes.func,
    linkType: PropTypes.oneOf(["preview", "direct"]),
    multiselect: PropTypes.bool,
    extensions: PropTypes.arrayOf(PropTypes.string),
    disabled: PropTypes.bool
  };

  static defaultProps = {
    cancel: () => {},
    linkType: "preview",
    multiselect: false,
    disabled: false
  };

  static isDropboxReady() {
    return !!window.Dropbox;
  }

  constructor(props) {
    super(props);

    this.onChoose = this.onChoose.bind(this);
  }

  componentDidMount() {
    const { appKey = "" } = this.props;
    if (!DropboxChooser.isDropboxReady() && !scriptLoadingStarted) {
      scriptLoadingStarted = true;
      loadScript(DROPBOX_SDK_URL, {
        attrs: {
          id: SCRIPT_ID,
          "data-app-key": appKey
        }
      });
    }
  }

  onChoose() {
    const {
      success,
      cancel,
      linkType,
      multiselect,
      extensions,
      disabled
    } = this.props;

    if (!DropboxChooser.isDropboxReady() || disabled) {
      return null;
    }

    return window.Dropbox.choose({
      success,
      cancel,
      linkType,
      multiselect,
      extensions
    });
  }

  render() {
    const { children, appKey } = this.props;
    return (
      appKey && (
        <div onClick={this.onChoose}>
          {children || <button type="button">Open Dropbox Chooser</button>}
        </div>
      )
    );
  }
}
