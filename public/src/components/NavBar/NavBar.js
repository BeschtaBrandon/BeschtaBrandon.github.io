import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './NavBar.scss';

import { Nav, Navbar, NavItem } from 'react-bootstrap';

class NavBar extends Component {
  render () {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Home</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} href="/work">
            Work
          </NavItem>
          <NavItem eventKey={2} href="/contact">
            Contact
          </NavItem>
        </Nav>
        <Nav pullRight>
          <NavItem eventKey={3} href="/stocks">
            Stocks
          </NavItem>
          <NavItem eventKey={4} href="/news">
            News
          </NavItem>
          <NavItem eventKey={5} href="/weather">
            Weather
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default NavBar;
