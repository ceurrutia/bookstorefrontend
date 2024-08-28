import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "/src/images/logo.png";
import ButtonAddNew from "./ButtonAddNew";
import ButtonAddNewDigital from "./ButtonAddNewDigital";
import { Link, useLocation } from "react-router-dom";

function Navigation() {
  const location = useLocation();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            alt="Logo"
            width="150"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/digital-books">Digital Books</Nav.Link>
            <NavDropdown title="Actions" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/edit">Edit</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/action-1">Action 1</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/some-link">Some Link</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/other-link">Other Link</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          {location.pathname === "/" ? <ButtonAddNew /> : 
           location.pathname === "/digital-books" ? <ButtonAddNewDigital /> : null}

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
