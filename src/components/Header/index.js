import { Component } from "react";
import Container from 'react-bootstrap/Container';

import Navbar from 'react-bootstrap/Navbar';

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
