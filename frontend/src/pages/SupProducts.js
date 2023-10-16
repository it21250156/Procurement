import React, { useEffect, useContext } from "react";
import { useProductsContext } from "../hooks/useProductsContext";
import { Link } from "react-router-dom";
import { SupplierContext } from "../context/SupplierContext";
import ProductDetailsSup from "../components/ProductDetailsSup";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const SupProducts = () => {
  const { products, dispatch } = useProductsContext();
  const { supplier, dispatch: supplierDispatch } = useContext(SupplierContext); // Correct usage of useContext
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
        navigate('/allProducts');
      }
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // No need to access supplierInfo from localStorage, it already have it in the context
        if (!supplier || !supplier._id) {
          console.error("Invalid or incomplete 'supplierInfo' data:", supplier);
          return;
        }

        const supplierId = supplier._id;

        const response = await fetch(`/api/products/Supplier/${supplierId}`);

        if (!response.ok) {
          console.error("Error fetching products. Status:", response.status);
          return;
        }

        const json = await response.json();

        dispatch({ type: "SET_PRODUCTS", payload: json });
      } catch (error) {
        console.error("Error during data fetching and processing:", error);
      }
    };

    fetchProducts();
  }, [dispatch, supplier]);

  return (
    <div className="allProducts">
      <div className="products">
        {products &&
          products.map((product) => (
            <ProductDetailsSup key={product._id} product={product} />
          ))}
      </div>
      <button className="add-product-btn">
        <Link to="/addproduct">Add new Product</Link>
      </button>

      {/** Logout button */}
      <button onClick={handleLogout}>Logout</button>

    </div>
  );
};

export default SupProducts;
