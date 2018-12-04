import React from "react";
import PropTypes from "prop-types";
import {
  Input,
  InputGroup,
  InputGroupButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import LinkIcon from "mdi-react/LinkIcon";
import ClipboardTextIcon from "mdi-react/ClipboardTextIcon";
import QrcodeIcon from "mdi-react/QrcodeIcon";

const copyToClipboard = content => {
  const tempInput = document.createElement("input");
  tempInput.style = "position: absolute; left: -1000px; top: -1000px";
  tempInput.value = content;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
};

export default class ConnectionIndicator extends React.Component {
  constructor(props) {
    super(props);

    this.toggleDropDown = this.toggleDropDown.bind(this);

    this.state = {
      dropdownOpen: false
    };
  }

  toggleDropDown() {
    const { dropdownOpen } = this.state;
    this.setState({
      dropdownOpen: !dropdownOpen
    });
  }

  // "<span role='img' aria-label='keyboard'>🎮</span> Ready",
  // "<span role='img' aria-label='questionmark'>❓</span> Waiting for connections",
  // `<span role='img' aria-label='success'>✅</span> ${numberOfClients} Clients Connected`,
  // "<span role='img' aria-label='cross'>❌</span> Error"

  render() {
    const { status, isServer, numberOfClients, ownServerId } = this.props;
    const { dropdownOpen } = this.state;
    const statusDescriptions = {
      client: ["⌨️ Ready", "Trying to connect", "✅ Connected", "❌ Error"],
      server: [
        "⌨️ Ready",
        "❓ Waiting for connections",
        `✅ ${numberOfClients} Clients Connected`,
        "❌ Error"
      ]
    };
    const componentRole = isServer ? "server" : "client";
    const value = statusDescriptions[componentRole][status];
    return (
      <InputGroup className="justify-content-center col-md-8">
        {isServer && status === 1 ? (
          <InputGroupButtonDropdown
            addonType="prepend"
            isOpen={dropdownOpen}
            toggle={this.toggleDropDown}
          >
            <DropdownToggle caret className="font-weight-bold">
              {`${ownServerId} `}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>Share</DropdownItem>
              <DropdownItem divider />
              <DropdownItem style={{ cursor: "pointer" }}>
                <QrcodeIcon className="text-muted" />
                {`  `}
                Show QR Code
              </DropdownItem>
              {document.queryCommandSupported("copy") && (
                <DropdownItem
                  onClick={() => {
                    copyToClipboard(ownServerId);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <ClipboardTextIcon className="text-muted" />
                  {`  `}
                  Copy ID
                </DropdownItem>
              )}
              <DropdownItem style={{ cursor: "pointer" }}>
                <LinkIcon className="text-muted" />
                {`  `}
                Copy Link
              </DropdownItem>
            </DropdownMenu>
          </InputGroupButtonDropdown>
        ) : null}
        <Input className="text-center col-5" value={value} disabled />
      </InputGroup>
    );
  }
}

ConnectionIndicator.propTypes = {
  isServer: PropTypes.bool,
  status: PropTypes.number.isRequired,
  numberOfClients: PropTypes.number,
  ownServerId: PropTypes.string
};

ConnectionIndicator.defaultProps = {
  isServer: false,
  numberOfClients: 0,
  ownServerId: ""
};
