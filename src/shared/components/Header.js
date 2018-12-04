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
    <>
      <Navbar
        expand="sm"
        className="mb-4 border-bottom shadow-sm d-flex flex-row justify-content-between"
      >
        <Container>
          <NavbarBrand tag={Link} to="/">
            Weclare
            {isServer ? " Server" : " Client"}
          </NavbarBrand>
          <ConnectionIndicator
            isServer={isServer}
            status={status}
            numberOfClients={numberOfClients}
            ownServerId={ownServerId}
          />
          <Nav className="flex-row">
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
    </>
  );
};

Header.propTypes = {
  isServer: PropTypes.bool,
  status: PropTypes.number.isRequired,
  numberOfClients: PropTypes.number,
  ownServerId: PropTypes.string
};

Header.defaultProps = {
  isServer: false,
  numberOfClients: 0,
  ownServerId: ""
};

export default Header;
