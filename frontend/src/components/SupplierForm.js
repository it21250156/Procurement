import { useState } from 'react';
import { useSupplierContext } from '../hooks/useSuppliersContext';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling
import Swal from 'sweetalert2';

const SupplierForm = () => {
  const { dispatch } = useSupplierContext();

  const [companyname, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [mobileno, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const siteManager = {
      companyname,
      address,
      mobileno,
      email,
      password,
    };

    const response = await fetch('/api/industry/suppliers', {
      method: 'POST',
      body: JSON.stringify(siteManager),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    } else {
      // If the response is successful, display a SweetAlert2 success notification
      Swal.fire({
        title: 'Success!',
        text: 'Supplier added successfully',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then((result) => {
        // After the user clicks "OK," navigate to the SiteManager page
        if (result.isConfirmed) {
          setCompanyName('');
          setAddress('');
          setMobileNo('');
          setEmail('');
          setPassword('');
          setError(null);
          dispatch({ type: 'CREATE_SUPPLIER', payload: json });
          console.log('new supplier added', json);
          // You should replace '/sitemanager' with the correct path to your SiteManager page
          window.location.href = '/suppliers';
        }
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="companyNameInput" class="form-label">
            Company Name
          </label>
          <input
            type="text"
            class="form-control"
            id="companyNameInput"
            onChange={(e) => setCompanyName(e.target.value)}
            value={companyname}
          />
        </div>

        <div class="mb-3">
          <label for="addressTextarea" class="form-label">
            Company Address
          </label>
          <textarea
            class="form-control"
            id="addressTextarea"
            rows="3"
            onChange={(e) => setAddress(e.target.value)}
            value={address}
          ></textarea>
        </div>

        <div class="mb-3">
          <label for="mobileNoInput" class="form-label">
            Mobile No
          </label>
          <input
            type="text"
            class="form-control"
            id="mobileNoInput"
            onChange={(e) => setMobileNo(e.target.value)}
            value={mobileno}
          />
        </div>

        <div class="mb-3">
          <label for="emailInput" class="form-label">
            Email Address
          </label>
          <input
            type="email"
            class="form-control"
            id="emailInput"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div class="mb-3">
          <label for="passwordInput" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="passwordInput"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Add Supplier
        </button>

        {error && <div className="error">{error}</div>}
      </form>
      <ToastContainer />
    </div>
  );
};

export default SupplierForm;
