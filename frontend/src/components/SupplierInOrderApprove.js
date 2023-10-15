import { Button } from 'react-bootstrap';

const SupplierInOrderApprove = ({ supplier }) => {
  return (
    <div>
      <div className="sitemanager_details">
        <div class="card mb-2">
          <div class="card-header">{supplier.companyname}</div>
          <div class="card-body">
            <p class="card-text">
              <strong>Email : </strong>
              {supplier.email}
            </p>
            <p class="card-text">
              <strong>Mobile No : </strong>
              {supplier.mobileno}
            </p>
            <Button variant="primary">Select</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierInOrderApprove;
