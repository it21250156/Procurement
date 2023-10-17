import { useState, useEffect } from 'react';
import { useProductsContext } from '../hooks/useProductsContext';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2
import PageHeading from './PageHeading';
import { Button } from 'react-bootstrap';

const UpdateProductForm = () => {
  const { dispatch } = useProductsContext();
  const [pName, setPname] = useState('');
  const [pUnit, setPunit] = useState('');
  const [pQty, setPqty] = useState('');
  const [pPrice, setPprice] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { _id } = useParams(); // Retrieve product ID from the URL

  // Fetch product details when the component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${_id}`);
        if (response.ok) {
          const productData = await response.json();
          const { pName, pUnit, pQty, pPrice } = productData;
          setPname(pName);
          setPunit(pUnit);
          setPqty(pQty);
          setPprice(pPrice);
        }
      } catch (error) {
        console.error('Error fetching product details', error);
      }
    };

    fetchProduct();
  }, [_id]);

  const validateForm = () => {
    let formErrors = {};

    if (!pName) {
      formErrors.pName = 'Product Name is required';
    }

    if (!pUnit) {
      formErrors.pUnit = 'Product Unit is required';
    }

    if (!pQty || isNaN(pQty) || pQty <= 0) {
      formErrors.pQty =
        'Product Quantity is required and must be a positive number';
    }

    if (!pPrice || isNaN(pPrice) || pPrice <= 0) {
      formErrors.pPrice =
        'Product Price is required and must be a positive number';
    }

    return formErrors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      return;
    }

    const updatedProduct = { pName, pUnit, pQty, pPrice };

    const response = await fetch(`/api/products/${_id}`, {
      method: 'PATCH', // Use PATCH for updating
      body: JSON.stringify(updatedProduct),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const json = await response.json();
      setErrors({ submit: json.error });
    } else {
      setErrors({});
      console.log('Product updated successfully');
      dispatch({ type: 'UPDATE_PRODUCT', payload: updatedProduct });
      // Show SweetAlert2 success message
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Product updated successfully!',
      }).then(() => {
        navigate('/supProducts');
      });
    }
  };
  const headingText = 'Update Product';
  return (
    <div className="container w-50 border border-success p-2 mb-2 border-opacity-25 rounded-2 mt-2 mb-2 shadow-sm ">
      <PageHeading text={headingText}></PageHeading>

      <form className="update-productForm" onSubmit={handleSubmit}>
        <label class="form-label ">Product Name: </label>
        <input
          type="text"
          class="form-control"
          onChange={(e) => setPname(e.target.value)}
          value={pName}
        />
        {errors.pName && <div className="error">{errors.pName}</div>}

        <label class="form-label">
          Product Unit (e.g., pieces, liters, kilograms):{' '}
        </label>
        <input
          type="text"
          class="form-control"
          onChange={(e) => setPunit(e.target.value)}
          value={pUnit}
        />
        {errors.pUnit && <div className="error">{errors.pUnit}</div>}

        <label class="form-label">Product Quantity: </label>
        <input
          type="number"
          class="form-control"
          onChange={(e) => setPqty(e.target.value)}
          value={pQty}
        />
        {errors.pQty && <div className="error">{errors.pQty}</div>}

        <label class="form-label">Product Price(per Unit): </label>
        <input
          type="number"
          class="form-control"
          onChange={(e) => setPprice(e.target.value)}
          value={pPrice}
        />
        {errors.pPrice && <div className="error">{errors.pPrice}</div>}

        <Button type="submit" className="btn-primary btn-lg m-2">
          Update Product
        </Button>
        {errors.submit && <div className="error">{errors.submit}</div>}
      </form>
    </div>
  );
};

export default UpdateProductForm;
