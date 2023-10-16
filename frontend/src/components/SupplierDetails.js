import { Button } from 'react-bootstrap';
import { useSupplierContext } from '../hooks/useSuppliersContext';

import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const SupplierDetails = ({ supplier }) => {
  const { dispatch } = useSupplierContext();

  const handleClick = async () => {
    Swal.fire({
      title: 'Delete Supplier',
      text: 'Are you sure you want to delete this supplier?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        // User clicked "Delete," perform the deletion
        const response = await fetch(
          '/api/industry/suppliers/' + supplier._id,
          {
            method: 'DELETE',
          }
        );
        //const json = await response.json();
        if (response.ok) {
          // If the deletion is successful, show a success notification
          Swal.fire('Deleted!', 'The supplier has been deleted.', 'success');
          dispatch({ type: 'DELETE_SUPPLIER', payload: supplier });
          window.location.href = '/suppliers';
        } else {
          // If there's an error with the deletion, show an error notification
          Swal.fire('Error', 'Could not delete the supplier.', 'error');
        }
      }
    });
  };

  return (
    <div className="sitemanager_details">
      <div class="card mb-3 ">
        <h5 class="card-header">{supplier.companyname}</h5>
        <div class="card-body">
          <p class="card-text">
            <strong>Email : </strong>
            {supplier.email}
          </p>
          <p class="card-text">
            <strong>Mobile No : </strong>
            {supplier.mobileno}
          </p>

          <Button variant="outline-danger" onClick={handleClick}>
            Delete
          </Button>
          <Link to={'/updatesupplier'}>
            <Button variant="outline-info">Update</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SupplierDetails;
