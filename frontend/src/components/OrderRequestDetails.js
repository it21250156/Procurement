import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const OrderRequests = ({ orderRequest }) => {
  return (
    <div className="sitemanager_details">
      <div class="card mb-2 w-75">
        <div class="card-body">
          <h5 class="card-title">{orderRequest.site}</h5>
          <p class="card-text">
            <strong>Site Manager Name : </strong>
            {orderRequest.sitemanagerid.name}
          </p>
          <p class="card-text">
            <strong>Item : </strong>
            {orderRequest.item}
          </p>
          <p class="card-text">
            <strong>Quantity : </strong>
            {orderRequest.quantity}
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
