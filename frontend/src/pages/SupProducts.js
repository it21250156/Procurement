import React, { useEffect, useContext } from 'react';
import { useProductsContext } from '../hooks/useProductsContext';
import { Link } from 'react-router-dom';
import { SupplierContext } from '../context/SupplierContext';
import ProductDetailsSup from '../components/ProductDetailsSup';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Button } from 'react-bootstrap';
import PageHeading from '../components/PageHeading';
import NavbarSupplier from '../components/NavbarSupplier';

const SupProducts = () => {
  const { products, dispatch } = useProductsContext();
  const { supplier, dispatch: supplierDispatch } = useContext(SupplierContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Use SweetAlert to show a confirmation dialog
    Swal.fire({
      title: 'Logout',
      text: 'Are you sure you want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed, perform the logout action
        supplierDispatch({ type: 'LOGOUT' });
        localStorage.removeItem('supplier');
        navigate('/');
      }
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!supplier || !supplier._id) {
          console.error("Invalid or incomplete 'supplierInfo' data:", supplier);
          return;
        }

        const supplierId = supplier._id;

        const response = await fetch(`/api/products/Supplier/${supplierId}`);

        if (!response.ok) {
          console.error('Error fetching products. Status:', response.status);
          return;
        }

        const json = await response.json();

        dispatch({ type: 'SET_PRODUCTS', payload: json });
      } catch (error) {
        console.error('Error during data fetching and processing:', error);
      }
    };

    fetchProducts();
  }, [dispatch, supplier]);

  const headingText = 'My Products';

  return (
    <div>
      <NavbarSupplier />
      <div className="container w-50 border border-success p-2 mb-2 border-opacity-25 rounded-2 mt-3 mb-3 shadow-sm ">
        <PageHeading text={headingText}></PageHeading>
        <Link to="/addproduct">
          <Button className="btn-primary m-2">Add new Product</Button>
        </Link>
        <Link to="/supplierOrders">
          <Button className="btn-primary m-2">Orders</Button>
        </Link>

        <Button className="btn-danger m-2" onClick={handleLogout}>
          Logout
        </Button>
        <div className="products">
          {products &&
            products.map((product) => (
              <ProductDetailsSup key={product._id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default SupProducts;
