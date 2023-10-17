import { useEffect } from 'react';
import { useProductsContext } from '../hooks/useProductsContext';

//components
import ProductDetails from '../components/ProductDetails';
import PageHeading from '../components/PageHeading';
import NavBar from '../components/NavBar';

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
      <NavBar />
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
