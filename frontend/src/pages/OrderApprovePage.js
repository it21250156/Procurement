import { useParams } from 'react-router-dom';
import PageHeading from '../components/PageHeading';
import { useEffect, useState } from 'react';
import SupplierInOrderApprove from '../components/SupplierInOrderApprove';
import NavBar from '../components/NavBar';

const OrderApprovePage = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [suppliers, setSuppliers] = useState(null);
  const [isApproved, setIsApproved] = useState(false);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await fetch(`/api/industry/orderrequests/${orderId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch order details');
        }
        const data = await response.json();
        setOrderDetails(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSuppliers = async () => {
      const response = await fetch('/api/industry/suppliers');
      const json = await response.json();

      if (response.ok) {
        setSuppliers(json);
      }
    };

    fetchSuppliers();
    fetchOrderDetails();
  }, [orderId]);

  const handleApprove = () => {
    // Set isApproved to true when the "Approve" button is clicked
    setIsApproved(true);
  };

  if (!orderDetails) {
    return (
      <div class="d-flex justify-content-center align-items-center">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const headingText = 'Approve Order';
  return (
    <div>
      <NavBar />
      <div class="container w-50 border border-success p-3 mb-2 border-opacity-25 rounded-2 mt-2 mb-2 shadow-sm ">
        <PageHeading text={headingText}></PageHeading>
        <div className="w-50 mx-auto">
          <table class="table table-bordered border-dark">
            <tr>
              <td>Site Name</td>
              <td>{orderDetails.site}</td>
            </tr>
            <tr>
              <td>Ordered Item</td>
              <td>{orderDetails.item}</td>
            </tr>
            <tr>
              <td>Ordered Quantity</td>
              <td>{orderDetails.quantity}</td>
            </tr>
          </table>
        </div>
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
          <button
            type="button"
            class="btn btn-success m-1"
            onClick={handleApprove}
            disabled={isApproved}
          >
            Approve
          </button>
          <button type="button" class="btn btn-danger  m-1">
            Decline
          </button>
        </div>
      </div>
      {isApproved && (
        <div className="SupplierInOrderApprove mt-3">
          <div class="container w-50 border border-success p-3 mb-2 border-opacity-25 rounded-2 mt-2 mb-2 shadow-sm ">
            <div className="container border border-primary rounded-2 mb-4 p-2 text-center text-primary">
              <h3>Related Suppliers</h3>
            </div>
            {suppliers &&
              suppliers.map((supplier) => (
                <SupplierInOrderApprove
                  supplier={supplier}
                  orderDetails={orderDetails}
                  key={supplier._id}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderApprovePage;
