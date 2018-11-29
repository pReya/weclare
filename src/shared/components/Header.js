import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Container,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import ConnectionIndicator from "./ConnectionIndicator";

const Header = props => {
  const { status, numberOfClients, isServer, ownServerId } = props;
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
            ownServerId={ownServerId}
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

export default Header;
