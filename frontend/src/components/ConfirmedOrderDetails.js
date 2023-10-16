const ConfirmedOrderDetails = ({ confirmedOrder }) => {
  return (
    <div>
      <table className="table table-bordered border-dark">
        <tbody>
          <tr>
            <td>{confirmedOrder.supplier.companyname}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ConfirmedOrderDetails;
