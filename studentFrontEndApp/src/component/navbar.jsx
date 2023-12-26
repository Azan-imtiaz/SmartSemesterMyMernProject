import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';



function Naavbar() {
    return (
      <>
        <Navbar bg="primary" expand="sm">
          <Container>
            <Navbar.Brand href="#home"  style={{ userSelect: 'none' }}>SmartSemester</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
              <Nav className="me-auto">
                <Nav.Link ><Link style={{color:"black",textDecoration:"none",userSelect: 'none'}} to="/home" >Home</Link></Nav.Link>
                <Nav.Link  style={{color:"black",textDecoration:"none",userSelect: 'none'}} href="https://www.linkedin.com/in/azan-imtiaz-818471234" >Developer</Nav.Link>
           
                <Nav.Link ><Link style={{color:"black",textDecoration:"none",userSelect: 'none'}} to="/ProfilePage" >Profile</Link></Nav.Link>
                
                
                {/* <Nav.Link href="#features">Developer</Nav.Link> */}
                {/* <Nav.Link href="#feature\s">Profile</Nav.Link> */}
            
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
  }
  
  export default Naavbar;
  