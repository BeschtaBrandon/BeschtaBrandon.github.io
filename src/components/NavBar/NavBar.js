import React, { useState } from "react";
import { NavDropdown, Nav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NavBar.scss";
import { dropdownOptions, navItemLinks } from "./constants";

const NavBar = () => {
  const [currentNavItemId, setCurrentNavItemId] = useState(-1);

  const handleSelectNavItem = id => {
    setCurrentNavItemId(id);
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <i className="fas fa-home" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {navItemLinks.map(link => {
              return (
                <Nav.Link
                  as={Link}
                  active={
                    currentNavItemId > 0 && setCurrentNavItemId === link.id
                  }
                  key={link.id}
                  to={link.href}
                  onClick={() => handleSelectNavItem(link.id)}
                >
                  {link.title}
                </Nav.Link>
              );
            })}
            <NavDropdown title="Toolbox" id="basic-nav-dropdown">
              {dropdownOptions.map(dropdownItem => {
                return (
                  <NavDropdown.Item
                    as={Link}
                    key={dropdownItem.id}
                    to={dropdownItem.href}
                  >
                    {dropdownItem.title}
                  </NavDropdown.Item>
                );
              })}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
