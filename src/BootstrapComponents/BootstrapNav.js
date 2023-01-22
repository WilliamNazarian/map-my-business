import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import Logo from "./icons8-location-48.png"



function BootstrapNav(props) {

    
    const formClickHandler = ()=>{
        props.onShow()
    }

  return (
    <Navbar bg="light" >
      <Container>
        <img style={{marginRight:"15px"}} src={Logo} alt="logo" />
        <Navbar.Brand href="#home">Map My Business</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end" style={{ width: "100%" }}>
            <Button onClick={formClickHandler} variant="secondary">Add Team</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BootstrapNav;
