import { Link } from 'react-router-dom';
import NavbarSupplier from '../components/NavbarSupplier';

const Home = () => {
  return (
    <div>
      <NavbarSupplier />
      <div className="container w-50 border border-success p-3 border-opacity-25 rounded-2 mt-2 mb-2 shadow-sm ">
        <div class="d-grid gap-2">
          <Link to={'/supplierlogin'}>
            <button class="btn btn-primary btn-lg">Supplier</button>
          </Link>
          <Link to={'/adminlogin'}>
            <button class="btn btn-primary btn-lg">Admin</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
