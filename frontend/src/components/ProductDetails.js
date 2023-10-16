import { useProductsContext } from '../hooks/useProductsContext';
import Swal from 'sweetalert2'; // Import the SweetAlert library

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductDetails = ({ product }) => {
  const { dispatch } = useProductsContext();

  const handleClick = async () => {
    const response = await fetch('/api/products/' + product._id, {
      method: 'DELETE',
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_PRODUCT', payload: json });
    }
  };

  const handleConfirm = () => {
    Swal.fire({
      title: 'Confirm Deletion',
      text: 'Are you sure you want to delete this Product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        handleClick(); // Call the delete function if confirmed
      }
    });
  };

  return (
    <div className="product-details m-3">
      <div class="card text-center">
        <div class="card-header">{product.pName}</div>
        <div class="card-body">
          <h5 class="card-title">
            <strong>product Price(per Unit):</strong> {product.pPrice}
          </h5>
          <p class="card-text">
            <strong>product Quantity:</strong> {product.pQty}
          </p>
          <p class="card-text">
            <strong>product Unit:</strong> {product.pUnit}
          </p>

          <p class="card-text">
            <strong>Supplier ID:</strong> {product.supplier}
          </p>
          <Button className="btn-danger m-2" onClick={handleConfirm}>
            Delete
          </Button>
        </div>
        <div class="card-footer text-body-secondary">
          {product.createdAt
            ? `Created: ${formatDistanceToNow(new Date(product.createdAt), {
                addSuffix: true,
              })}`
            : 'N/A'}
          {product.updatedAt && product.updatedAt !== product.createdAt ? (
            <span>
              {' '}
              | Updated:{' '}
              {formatDistanceToNow(new Date(product.updatedAt), {
                addSuffix: true,
              })}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
