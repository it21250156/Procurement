import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SupplierInOrderApprove = ({ supplier, orderId }) => {
  const navigate = useNavigate();
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleSelect = async () => {
    // Make an API request to create a confirmed order
    try {
      const response = await fetch('/api/confirmedorders/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ supplierId: supplier._id, orderId }),
      });

      if (response.ok) {
        setIsConfirmed(true);
        navigate('/confirmedorderpage');
      }
    } catch (error) {
      console.error(error);
    }
  };

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
            <Button
              variant="primary"
              onClick={handleSelect}
              disabled={isConfirmed}
            >
              Select
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierInOrderApprove;
