import { useEffect, useState } from 'react';
import ConfirmedOrderDetails from '../components/ConfirmedOrderDetails';

const ConfirmedOrderPage = () => {
  const [confirmedOrders, setConfirmedOrders] = useState([]);

  useEffect(() => {
    fetch('/api/confirmedorders')
      .then((response) => response.json())
      .then((data) => setConfirmedOrders(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>confirmed orders</h1>
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
                <td>{confirmedOrder._id.site}</td>
                <td>{confirmedOrder._id.item}</td>
                {/* antimata kre */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ConfirmedOrderPage;
