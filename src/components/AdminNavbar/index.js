import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import "./index.css"; // Assuming you have additional custom styles

class AdminNavbar extends Component {
  handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    this.props.history.push("/"); // Redirect to home page
  };

  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
          <Container>
            <Navbar.Brand href="/admin">
              <img src="./sngr.jpg" className="logo" alt="logo" />
              SNGR SOFA WORLD
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto nav-buttons">
                <Nav.Link href="/customers">
                  <Button variant="outline-light">Customers</Button>
                </Nav.Link>
                <Nav.Link href="/InvoiceForm">
                  <Button variant="outline-light">Billing</Button>
                </Nav.Link>
                <Nav.Link href="/sofaupload">
                  <Button variant="outline-light">Sofa Upload</Button>
                </Nav.Link>
                <Nav.Link>
                  <Button variant="outline-light" onClick={this.handleLogout}>
                    Logout
                  </Button>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(AdminNavbar);
