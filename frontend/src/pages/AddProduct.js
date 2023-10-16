import React, { useEffect } from 'react';
import ProductForm from '../components/ProductForm';
import { useProductsContext } from '../hooks/useProductsContext';
import PageHeading from '../components/PageHeading';

function AddProduct() {
  const { dispatch } = useProductsContext();

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

  const headingText = 'Add a new Product';

  return (
    <div className="container w-50 border border-success p-2 mb-2 border-opacity-25 rounded-2 mt-3 mb-3 shadow-sm">
      <PageHeading text={headingText}></PageHeading>
      <ProductForm />
    </div>
  );
}

export default AddProduct;
