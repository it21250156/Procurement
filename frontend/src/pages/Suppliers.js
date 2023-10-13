import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

// pages, components
import PageHeading from '../components/PageHeading';
import SupplierDetails from '../components/SupplierDetails';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState(null);

  useEffect(() => {
    const fetchSuppliers = async () => {
      const response = await fetch('/api/industry/suppliers');
      const json = await response.json();

      if (response.ok) {
        setSuppliers(json);
      }
    };
    fetchSuppliers();
  }, []);

  const headingText = 'Suppliers';
  return (
    <div>
      <div class="container border border-success p-2 mb-2 border-opacity-25 rounded-2 mt-2 mb-2 shadow-sm ">
        <PageHeading text={headingText}></PageHeading>
        <div class="d-grid gap-2 d-md-flex justify-content-md-end">
          <Link to={'/supplieraddpage'}>
            <button type="button" class="btn btn-success btn-lg mb-2">
              Add a Supplier
            </button>
          </Link>
        </div>
        {suppliers &&
          suppliers.map((supplier) => (
            <SupplierDetails supplier={supplier} key={supplier._id} />
          ))}
      </div>
    </div>
  );
};

export default Suppliers;
