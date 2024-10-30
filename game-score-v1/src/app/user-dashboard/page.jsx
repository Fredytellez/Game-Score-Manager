"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Container, Nav, Navbar, NavDropdown, Stack } from "react-bootstrap";

const DashboardPage = () => {
  const router = useRouter();


  const handleLogout = () => {
    // logica para el cierre de sesion.

    router.push("/login")
  }



  return (
    <Container fluid className="p-4 ">
      <Navbar expand="lg" className="bg-body-tertiary border rounded">
        <Container>
          <Navbar.Brand href="#home" >Game Score Manager</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Scores</Nav.Link>
              <NavDropdown title="User Name" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Settings
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4" onClick={handleLogout}>
                  Log out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container
        className="d-flex p-3 justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <Stack
          gap={3}
          className="bg-white p-4 border rounded d-flex justify-content-center align-items-center"
          style={{ borderRadius: "5px" }}
        >
          <div className="p-2">First item</div>
          <div className="p-2">Second item</div>
          <div className="p-2">Third item</div>
        </Stack>
      </Container>
    </Container>
  );
};

export default DashboardPage;
