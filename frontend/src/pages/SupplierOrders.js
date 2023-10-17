import { useEffect, useState, useContext } from 'react';
import PageHeading from '../components/PageHeading';
import { SupplierContext } from '../context/SupplierContext';
import NavbarSupplier from '../components/NavbarSupplier';

const SupplierOrders = () => {
  const { supplier } = useContext(SupplierContext); // Get the supplier information from the context

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

  // handle changing order status
  const handleOrderStatusChange = (orderId, newStatus) => {
    // API call to update the order status
    fetch('/api/updateorderstatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderId, newStatus }), // Send the selected new status
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Order status updated:', data);
      })
      .catch((error) => console.error(error));
  };

  // Filter confirmed orders based on the logged-in supplier's ID
  const filteredConfirmedOrders = confirmedOrders.filter(
    (confirmedOrder) => confirmedOrder.supplier._id === supplier._id
  );

  return (
    <div>
      <NavbarSupplier />
      <div className="container w-50 border border-success p-3 mb-2 border-opacity-25 rounded-2 mt-2 mb-2 shadow-sm">
        <PageHeading text={headingText}></PageHeading>
        {filteredConfirmedOrders.length > 0 && (
          <table className="table table-bordered border-dark">
            <thead>
              <tr>
                <th>sitemanager ID</th>
                <th>Order Site</th>
                <th>Ordered Item</th>
                <th>Ordered Quantity</th>
                <th>Order Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredConfirmedOrders.map((confirmedOrder) => (
                <tr key={confirmedOrder._id}>
                  <td>{confirmedOrder.order.sitemanagerid}</td>
                  <td>{confirmedOrder.order.site}</td>
                  <td>{confirmedOrder.order.item}</td>
                  <td>{confirmedOrder.order.quantity}</td>
                  <td>
                    <select
                      value={confirmedOrder.orderstatus} // Set the initial value from the order's status
                      onChange={(e) =>
                        handleOrderStatusChange(
                          confirmedOrder.orderstatus,
                          e.target.value
                        )
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Declined">Declined</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SupplierOrders;
