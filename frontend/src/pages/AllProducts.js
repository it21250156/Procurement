import { useEffect } from 'react';
import { useProductsContext } from '../hooks/useProductsContext';
import { NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

//components
import ProductDetails from '../components/ProductDetails';
import PageHeading from '../components/PageHeading';

const AllProducts = () => {
  const { products, dispatch } = useProductsContext();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/products');
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_PRODUCTS', payload: json });
      }
    };

    fetchProducts();
  }, [dispatch]);
  const headingText = 'All Products';
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
      <div className="allProducts  container w-50 border border-success p-2 mb-2 border-opacity-25 rounded-2 mt-2 mb-2 shadow-sm">
        <PageHeading text={headingText}></PageHeading>
        <div className="products">
          {products &&
            products.map((product) => (
              <ProductDetails key={product._id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
