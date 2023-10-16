import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// pages, components
import PageHeading from '../components/PageHeading';
import SupplierDetails from '../components/SupplierDetails';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState(null);

  useEffect(() => {
    const fetchSuppliers = async () => {
      const response = await fetch('/api/industry/suppliers');
      const json = await response.json();

      if (response.ok) {
        setSuppliers(json);
      }
    };
    fetchSuppliers();
  }, []);

  const headingText = 'Suppliers';
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
      <div class="container border border-success p-2 mb-2 border-opacity-25 rounded-2 mt-2 mb-2 shadow-sm ">
        <PageHeading text={headingText}></PageHeading>
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
          <Link to={'/supplieraddpage'}>
            <button type="button" class="btn btn-success btn-lg mb-2">
              Add a Supplier
            </button>
          </Link>
        </div>
        {suppliers &&
          suppliers.map((supplier) => (
            <SupplierDetails supplier={supplier} key={supplier._id} />
          ))}
      </div>
    </div>
  );
};

export default Suppliers;
