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

const Header = props => {
  const { status, numberOfClients, isServer } = props;
  return (
    <div>
      <Navbar expand="lg" className="mb-4 border-bottom shadow-sm">
        <Container>
          <NavbarBrand className="mr-auto" tag={Link} to="/">
            Weclare
            {isServer ? " Server" : " Client"}
          </NavbarBrand>
          <ConnectionIndicator
            isServer={isServer}
            status={status}
            numberOfClients={numberOfClients}
          />
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
};

Header.propTypes = {
  isServer: PropTypes.bool,
  status: PropTypes.number.isRequired,
  numberOfClients: PropTypes.number
};

Header.defaultProps = {
  isServer: false,
  numberOfClients: 0
};

const ConnectionIndicator = props => {
  const { status, isServer, numberOfClients } = props;
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
  return <Input className="text-center col-3" value={value} disabled />;
};

ConnectionIndicator.propTypes = {
  isServer: PropTypes.bool,
  status: PropTypes.number.isRequired,
  numberOfClients: PropTypes.number
};

ConnectionIndicator.defaultProps = {
  isServer: false,
  numberOfClients: 0
};

export default Header;
