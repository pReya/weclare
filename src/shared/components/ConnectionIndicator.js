import React from "react";
import PropTypes from "prop-types";
import {
  Input,
  InputGroup,
  InputGroupButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody
} from "reactstrap";
import LinkIcon from "mdi-react/LinkIcon";
import ClipboardTextIcon from "mdi-react/ClipboardTextIcon";
import QrcodeIcon from "mdi-react/QrcodeIcon";
import QRCode from "qrcode.react";

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

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.toggleModal = this.toggleModal.bind(this);

    this.state = {
      dropdownOpen: false,
      showModal: false
    };
  }

  toggleDropdown() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  toggleModal() {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  }

  render() {
    const { status, isServer, numberOfClients, ownServerId, peer } = this.props;
    const { dropdownOpen, showModal } = this.state;
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
    const peerOpen = peer && peer.open;
    return (
      <InputGroup className="justify-content-center col-md-8">
        {isServer && [1, 2, 3].includes(status) && peerOpen ? (
          <InputGroupButtonDropdown
            addonType="prepend"
            isOpen={dropdownOpen}
            toggle={this.toggleDropdown}
          >
            <DropdownToggle caret className="font-weight-bold">
              {`${ownServerId} `}
            </DropdownToggle>

            <DropdownMenu>
              <DropdownItem header>Share with client</DropdownItem>
              <DropdownItem divider />

              <DropdownItem
                style={{ cursor: "pointer" }}
                onClick={this.toggleModal}
              >
                <QrcodeIcon className="text-muted" />
                {`  `}
                Show QR Code
              </DropdownItem>
              <Modal isOpen={showModal} toggle={this.toggleModal} size="lg">
                <ModalHeader toggle={this.toggleModal}>
                  Share QR Code
                </ModalHeader>
                <ModalBody>
                  <QRCode
                    value={`${
                      window.location.origin
                    }/client/connect/${ownServerId}`}
                    style={{ width: "100%", height: "100%" }}
                    renderAs="svg"
                  />
                </ModalBody>
              </Modal>
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
              <DropdownItem
                style={{ cursor: "pointer" }}
                onClick={() => {
                  copyToClipboard(
                    encodeURI(
                      `${window.location.origin}/client/connect/${ownServerId}`
                    )
                  );
                }}
              >
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
