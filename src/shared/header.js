import React from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

export default function Header(props) {
  return (
    <div>
      <Navbar color="primary" dark expand="lg" className="mb-4">
        <Container>
          <NavbarBrand className="mr-auto" tag={Link} to="/">
            Weclare
          </NavbarBrand>
          <Row>
            <Col>
              <InputGroup>
                <Input value="✅ Connected" />
              </InputGroup>
            </Col>
          </Row>
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
