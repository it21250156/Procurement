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
    return <div>Loading...</div>;
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
          </table>
        </div>
        <div class="d-grid gap-2 col-6 mx-auto">
          <button
            type="button"
            class="btn btn-success btn-lg m-1"
            onClick={handleApprove}
            disabled={isApproved}
          >
            Approve
          </button>
          <button type="button" class="btn btn-danger btn-lg m-1">
            Decline
          </button>
        </div>

        {isApproved && (
          <div className="SupplierInOrderApprove mt-3">
            {suppliers &&
              suppliers.map((supplier) => (
                <SupplierInOrderApprove
                  supplier={supplier}
                  orderDetails={orderDetails}
                  key={supplier._id}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderApprovePage;
