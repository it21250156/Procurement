import PageHeading from '../components/PageHeading';
import SupplierForm from '../components/SupplierForm';
import NavBar from '../components/NavBar';

const SupplierAddPage = () => {
  const headingText = 'Add a New Supplier';
  return (
    <div>
      <NavBar />
      <div class="container border border-success p-2 mb-2 border-opacity-25 rounded-2 mt-2 mb-2 shadow-sm ">
        <PageHeading text={headingText}></PageHeading>
        <SupplierForm />
      </div>
    </div>
  );
};

export default SupplierAddPage;
