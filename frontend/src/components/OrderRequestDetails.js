import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const OrderRequests = ({ orderRequest }) => {
  return (
    <div className="sitemanager_details">
      <div className="card mb-2 w-75">
        <div className="card-body">
          <h5 className="card-title">{orderRequest.site}</h5>
          <p className="card-text">
            <strong>Site Manager Name : </strong>
            {orderRequest.sitemanagerid
              ? orderRequest.sitemanagerid.name
              : 'N/A'}
          </p>
          <p className="card-text">
            <strong>Item : </strong>
            {orderRequest.item}
          </p>
          <p className="card-text">
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
