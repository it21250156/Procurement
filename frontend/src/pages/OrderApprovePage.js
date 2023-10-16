import { useParams } from 'react-router-dom';
import PageHeading from '../components/PageHeading';
import { useEffect, useState } from 'react';
import SupplierInOrderApprove from '../components/SupplierInOrderApprove';
import { NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const OrderApprovePage = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [suppliers, setSuppliers] = useState(null);
  const [isApproved, setIsApproved] = useState(false);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`/api/industry/orderrequests/${orderId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch order details');
        }
        const data = await response.json();
        setOrderDetails(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSuppliers = async () => {
      const response = await fetch('/api/industry/suppliers');
      const json = await response.json();

      if (response.ok) {
        setSuppliers(json);
      }
    };

    fetchSuppliers();
    fetchOrderDetails();
  }, []);

  const handleApprove = () => {
    // Set isApproved to true when the "Approve" button is clicked
    setIsApproved(true);
  };

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  const headingText = 'Approve Order';
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
        <div className="w-50 mx-auto">
          <table class="table table-bordered border-dark">
            <tr>
              <td>Site Name</td>
              <td>{orderDetails.site}</td>
            </tr>
            <tr>
              <td>Ordered Item</td>
              <td>{orderDetails.item}</td>
            </tr>
          </table>
        </div>
        <div class="d-grid gap-2 col-6 mx-auto">
          <button
            type="button"
            class="btn btn-success btn-lg m-1"
            onClick={handleApprove}
            disabled={isApproved}
          >
            Approve
          </button>
          <button type="button" class="btn btn-danger btn-lg m-1">
            Decline
          </button>
        </div>

        {isApproved && (
          <div className="SupplierInOrderApprove mt-3">
            {suppliers &&
              suppliers.map((supplier) => (
                <SupplierInOrderApprove
                  supplier={supplier}
                  orderDetails={orderDetails}
                  key={supplier._id}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderApprovePage;
