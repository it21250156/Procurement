import { Link } from 'react-router-dom';
import NavbarSupplier from '../components/NavbarSupplier';
import '../CSS/All.css';

const Home = () => {
  return (
    <div>
      <NavbarSupplier />
      <div className="container w-50 border border-success p-3 border-opacity-25 rounded-2 mt-5 mb-2 shadow-sm ">
        <div class="mx-auto d-flex justify-content-center">
          <Link to={'/adminlogin'}>
            <button class="button m-2">
              ADMIN
              <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </Link>
          <Link to={'/supplierlogin'}>
            <button class="button m-2">
              SUPPLIER
              <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
