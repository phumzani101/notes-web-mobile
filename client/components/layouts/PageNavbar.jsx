"use client";
import Link from "next/link";
import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { AuthContext } from "../../store/AuthContext";
import { removeFromLocalStorage } from "../../store/lsutils";

const PageNavbar = () => {
  const [auth, setAuth] = useContext(AuthContext);

  const handleSignOut = () => {
    setAuth(null);
    removeFromLocalStorage();
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/" as={Link}>
          Notes Web
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/" as={Link}>
              Home
            </Nav.Link>

            {auth && auth?.user ? (
              <NavDropdown
                title={auth?.user?.name}
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item href="/auth/signin" as={Link}>
                  Profile
                </NavDropdown.Item>
                <a
                  className="dropdown-item"
                  href="#"
                  type="button"
                  onClick={handleSignOut}
                >
                  Sign Out
                </a>
              </NavDropdown>
            ) : (
              <NavDropdown title="Account" id="collasible-nav-dropdown">
                <NavDropdown.Item href="/auth/signin" as={Link}>
                  Sign In
                </NavDropdown.Item>
                <NavDropdown.Item href="/auth/signup" as={Link}>
                  Sign Up
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PageNavbar;
