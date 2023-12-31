import { NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavBar = () => {
  return (
    <header>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="me-auto">
            <NavDropdown title="Orders" id="basic-nav-dropdown">
              <NavDropdown.Item href="/orderrequests">
                Order Requests
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/confirmedorderpage">
                Confirmed Orders
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/sitemanagers">Site Managers</Nav.Link>
            <Nav.Link href="/suppliers">Suppliers</Nav.Link>
            <Nav.Link href="/allProducts">All Products</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default NavBar;
