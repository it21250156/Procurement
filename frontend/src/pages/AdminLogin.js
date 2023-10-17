import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import NavbarSupplier from '../components/NavbarSupplier';
import PageHeading from '../components/PageHeading';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const validateForm = () => {
      let formErrors = {};

      if (email !== 'admin@gmail.com' || password !== 'admin123') {
        formErrors.email = 'Invalid email or password';
      }

      return formErrors;
    };

    const formErrors = validateForm();

    if (Object.keys(formErrors).length > 0) {
      setError(formErrors);

      // Display error message
      Swal.fire({
        title: 'Error!',
        text: 'Invalid email or password',
        icon: 'error',
        confirmButtonText: 'OK',
      });

      return;
    }

    // Clear the previous error state
    setError({});

    // Display success message

    Swal.fire({
      title: 'Success!',
      text: 'Login successful',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Logged in successfully');
        navigate('/orderrequests');
      }
    });
  };

  const headingText = 'Admin Login';

  return (
    <div>
      <NavbarSupplier />
      <div className="container w-50 border border-success p-2 mb-2 border-opacity-25 rounded-2 mt-2 mb-2 shadow-sm">
        <PageHeading text={headingText}></PageHeading>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="emailInput" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="emailInput"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            {error.email && <div className="error">{error.email}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="passwordInput" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {error.password && <div className="error">{error.password}</div>}
          </div>
          <div className="d-grid gap-2 col-6 mx-auto m-5">
            <button type="submit" className="btn btn-primary btn-lg">
              Login
            </button>
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AdminLogin;
