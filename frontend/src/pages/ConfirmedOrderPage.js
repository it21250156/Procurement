import { useEffect, useState } from 'react';
import PageHeading from '../components/PageHeading';
import { NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const ConfirmedOrderPage = () => {
  const [confirmedOrders, setConfirmedOrders] = useState([]);

  useEffect(() => {
    fetch('/api/confirmedorders')
      .then((response) => response.json())
      .then((data) => {
        console.log('Confirmed Orders:', data);
        setConfirmedOrders(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const headingText = 'Confirmed Orders';

  return (
    <div>
      <header>
        <Navbar bg="primary" data-bs-theme="dark">
          <Container>
            <Navbar.Brand href="/supplierlogin">Home</Navbar.Brand>
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
              <Nav.Link href="/supplierlogin">Supplier Login</Nav.Link>
              <Nav.Link href="/allProducts">All Products</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </header>
      <div class="container w-50 border border-success p-3 mb-2 border-opacity-25 rounded-2 mt-2 mb-2 shadow-sm ">
        <PageHeading text={headingText}></PageHeading>
        {confirmedOrders.length > 0 && (
          <table className="table table-bordered border-dark">
            <thead>
              <tr>
                <th>Supplier Name</th>
                <th>Supplier Email</th>
                <th>Order Site</th>
                <th>Ordered Item</th>
              </tr>
            </thead>
            <tbody>
              {confirmedOrders.map((confirmedOrder) => (
                <tr key={confirmedOrder._id}>
                  <td>{confirmedOrder.supplier.companyname}</td>
                  <td>{confirmedOrder.supplier.email}</td>
                  <td>{confirmedOrder.order.quantity}</td>
                  <td>{confirmedOrder.order.item}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ConfirmedOrderPage;
