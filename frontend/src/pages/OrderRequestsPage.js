import { useEffect, useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import PageHeading from '../components/PageHeading';
import OrderRequestsDetails from '../components/OrderRequestDetails';

const OrderRequestsPage = () => {
  const [orderRequests, setOrderRequests] = useState(null);

  useEffect(() => {
    const fetchOrderRequests = async () => {
      const response = await fetch('/api/industry/orderrequests');
      const json = await response.json();

      if (response.ok) {
        // Filter the order requests with orderstatus as "Pending"
        const pendingOrderRequests = json.filter(
          (orderRequest) => orderRequest.orderstatus === 'Pending'
        );

        setOrderRequests(pendingOrderRequests);
      }
    };
    fetchOrderRequests();
  }, []);

  const headingText = 'Order Requests';
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
      <div class="container w-50 border border-success p-2 mb-2 border-opacity-25 rounded-2 mt-2 mb-2 shadow-sm ">
        <PageHeading text={headingText}></PageHeading>

        {orderRequests &&
          orderRequests.map((orderRequest) => (
            <OrderRequestsDetails
              key={orderRequest._id}
              orderRequest={orderRequest}
            />
          ))}
      </div>
    </div>
  );
};

export default OrderRequestsPage;
