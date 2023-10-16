import { useEffect, useState } from 'react';
import PageHeading from '../components/PageHeading';
import OrderRequestsDetails from '../components/OrderRequestDetails';

const OrderRequestsPage = () => {
  const [orderRequests, setOrderRequests] = useState(null);

  useEffect(() => {
    const fetchOrderRequests = async () => {
      const response = await fetch('/api/industry/orderrequests');
      const json = await response.json();

      if (response.ok) {
        // Filter the order requests with orderstatus as "Pending"
        const pendingOrderRequests = json.filter(
          (orderRequest) => orderRequest.orderstatus === 'Pending'
        );

        setOrderRequests(pendingOrderRequests);
      }
    };
    fetchOrderRequests();
  }, []);

  const headingText = 'Order Requests';
  return (
    <div>
      <div class="container w-50 border border-success p-2 mb-2 border-opacity-25 rounded-2 mt-2 mb-2 shadow-sm ">
        <PageHeading text={headingText}></PageHeading>

        {orderRequests &&
          orderRequests.map((orderRequest) => (
            <OrderRequestsDetails
              key={orderRequest._id}
              orderRequest={orderRequest}
            />
          ))}
      </div>
    </div>
  );
};

export default OrderRequestsPage;
