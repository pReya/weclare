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
      <InputGroup className="justify-content-center">
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
              <DropdownItem>Show QR Code</DropdownItem>
              <DropdownItem>Copy ID</DropdownItem>
              <DropdownItem>Copy Link</DropdownItem>
            </DropdownMenu>
          </InputGroupButtonDropdown>
        ) : null}
        <Input className="text-center col-3" value={value} disabled />
      </InputGroup>
    );
  }
}

ConnectionIndicator.propTypes = {
  isServer: PropTypes.bool,
  status: PropTypes.number.isRequired,
  numberOfClients: PropTypes.number
};

ConnectionIndicator.defaultProps = {
  isServer: false,
  numberOfClients: 0
};
