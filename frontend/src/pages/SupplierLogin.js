import React, { useState, useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { SupplierContext } from '../context/SupplierContext';
import PageHeading from '../components/PageHeading';
import NavbarSupplier from '../components/NavbarSupplier';

const SupplierLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ email: '', password: '' });

  const { dispatch } = useContext(SupplierContext);

  const handleLogin = async (e) => {
    e.preventDefault();

    const validateForm = () => {
      let formErrors = {};

      if (!email) {
        formErrors.email = 'Email is required';
      }

      if (!password) {
        formErrors.password = 'Password is required';
      }

      return formErrors;
    };

    const formErrors = validateForm();
    setError(formErrors);

    if (Object.keys(formErrors).length > 0) {
      return;
    }

    try {
      const response = await fetch(`/api/industry/suppliers/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const json = await response.json();

      if (json.loginSuccess) {
        // Clear the previous error state
        setError({});

        // After successful login, store the supplier information in localStorage
        localStorage.setItem('supplier', JSON.stringify(json));

        // Include the supplier information in the payload when dispatching the LOGIN action
        dispatch({ type: 'LOGIN', payload: json });

        Swal.fire({
          title: 'Success!',
          text: 'Login successful',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            console.log('Logged in successfully', json);
            window.location.href = '/supProducts';
          }
        });
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Login failed. Please check your credentials.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const headingText = 'Login for Supplier';

  return (
    <div>
      <NavbarSupplier></NavbarSupplier>
      <div class="container w-50 border border-success p-2 mb-2 border-opacity-25 rounded-2 mt-2 mb-2 shadow-sm ">
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
          <div class="d-grid gap-2 col-6 mx-auto m-5">
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

export default SupplierLogin;
