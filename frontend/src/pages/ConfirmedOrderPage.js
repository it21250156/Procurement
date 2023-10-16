import { useEffect, useState } from 'react';
import PageHeading from '../components/PageHeading';

const ConfirmedOrderPage = () => {
  const [confirmedOrders, setConfirmedOrders] = useState([]);

  useEffect(() => {
    fetch('/api/confirmedorders')
      .then((response) => response.json())
      .then((data) => {
        console.log('Confirmed Orders:', data);
        setConfirmedOrders(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const headingText = 'Confirmed Orders';

  return (
    <div>
      <div class="container w-50 border border-success p-3 mb-2 border-opacity-25 rounded-2 mt-2 mb-2 shadow-sm ">
        <PageHeading text={headingText}></PageHeading>
        {confirmedOrders.length > 0 && (
          <table className="table table-bordered border-dark">
            <thead>
              <tr>
                <th>Supplier Name</th>
                <th>Supplier Email</th>
                <th>Order Site</th>
                <th>Ordered Item</th>
              </tr>
            </thead>
            <tbody>
              {confirmedOrders.map((confirmedOrder) => (
                <tr key={confirmedOrder._id}>
                  <td>{confirmedOrder.supplier.companyname}</td>
                  <td>{confirmedOrder.supplier.email}</td>
                  <td>{confirmedOrder.order.quantity}</td>
                  <td>{confirmedOrder.order.item}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ConfirmedOrderPage;
