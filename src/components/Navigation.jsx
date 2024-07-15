import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "/src/images/logo.png";
import Button from "react-bootstrap/Button";
import ButtonAddNew from "./ButtonAddNew";

function Navigation() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">
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
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#">Contact support</Nav.Link>
            <NavDropdown title="Actions" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Edit</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Action 1
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Some Link</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Other Link
              </NavDropdown.Item>
            </NavDropdown>
            {/* <Nav.Link href="#">
            <ButtonAddNew />
          </Nav.Link> */}
          </Nav>

          <ButtonAddNew />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
