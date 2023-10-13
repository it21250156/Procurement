import PageHeading from '../components/PageHeading';

const OrderRequestsPage = () => {
  const headingText = 'Order Requests';
  return (
    <div>
      <div class="container border border-success p-2 mb-2 border-opacity-25 rounded-2 mt-2 mb-2 shadow-sm ">
        <PageHeading text={headingText}></PageHeading>
        <h1>Requests</h1>
      </div>
    </div>
  );
};

export default OrderRequestsPage;
