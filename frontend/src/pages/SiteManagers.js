import { useEffect } from 'react';
import { useSiteManagerContext } from '../hooks/useSiteManagersContext';
import { NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

//components
import SiteManagerDetails from '../components/SiteManagerDetails';
import PageHeading from '../components/PageHeading';
import { Link } from 'react-router-dom';

const SiteManagers = () => {
  const { siteManagers, dispatch } = useSiteManagerContext();

  useEffect(() => {
    const fetchSiteManagers = async () => {
      const response = await fetch('/api/industry/sitemanagers');
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_SITEMANAGER', payload: json });
      }
    };
    fetchSiteManagers();
  }, [dispatch]);

  const headingText = 'Site Managers';

  return (
    <div className="home">
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
      <div className="sitemanagers">
        <div class="container border border-success p-2 mb-2 border-opacity-25 rounded-2 mt-2 mb-2 shadow-sm ">
          <PageHeading text={headingText}></PageHeading>
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <Link to={'/sitemanageraddpage'}>
              <button type="button" class="btn btn-success btn-lg mb-2">
                Add a Site Manager
              </button>
            </Link>
          </div>
          {siteManagers &&
            siteManagers.map((siteManager) => (
              <SiteManagerDetails
                key={siteManager._id}
                siteManager={siteManager}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default SiteManagers;
