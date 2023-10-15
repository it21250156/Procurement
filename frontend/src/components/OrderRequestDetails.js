import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSupplierContext } from '../hooks/useSuppliersContext';

import Swal from 'sweetalert2';

const OrderRequests = ({ orderRequest }) => {
  return (
    <div className="sitemanager_details">
      <div class="card w-50">
        <div class="card-body">
          <h5 class="card-title">{orderRequest.site}</h5>
          <p class="card-text">
            <strong>Item : </strong>
            {orderRequest.item}
          </p>
          <p class="card-text">
            <strong>Price : </strong>
            {orderRequest.price}
          </p>
          <Link to={`/orderapprove/${orderRequest._id}`}>
            <Button variant="btn btn-secondary">More...</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderRequests;
