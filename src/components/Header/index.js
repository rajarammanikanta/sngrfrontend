import { Component } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import './index.css';

class Header extends Component {
  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark" fixed="top">
          <Container>
            <Navbar.Brand href="#home"><img src="./sngr.jpg" className="logo" alt="logo"/>SNGR SOFA WORLD</Navbar.Brand>
           
          </Container>
        </Navbar>
      </>
    );
  }
}

export default Header;
