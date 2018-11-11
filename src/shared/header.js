import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Container,
  Input,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

export default function Header(props) {
  const { status, isServer } = props;
  console.log("Header");
  return (
    <div>
      <Navbar expand="lg" className="mb-4 border-bottom shadow-sm">
        <Container>
          <NavbarBrand className="mr-auto" tag={Link} to="/">
            Weclare
          </NavbarBrand>
          <ConnectionIndicator isServer={isServer} status={status} {...props} />
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/">
                Help
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/">
                About
              </NavLink>
            </NavItem>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

Header.propTypes = {
  isServer: PropTypes.bool,
  status: PropTypes.number.isRequired
};

Header.defaultProps = {
  isServer: false
};

function ConnectionIndicator(props) {
  const { status, isServer, numberOfClients } = props;
  const statusDescriptions = {
    client: ["⌨️ Ready", "Trying to connect", "✅ Connected", "❌ Error"],
    server: [
      "⌨️ Ready",
      "Waiting for connections",
      `✅ ${numberOfClients} Clients Connected`,
      "❌ Error"
    ]
  };
  const componentRole = isServer ? "server" : "client";
  const value = statusDescriptions[componentRole][status];
  return <Input className="text-center col-3" value={value} disabled />;
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
