import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const SupplierLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
  
    // Send a POST request to your login API endpoint
    const response = await fetch(`/api/industry/suppliers/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }), // Include email and password
    });
  
    if (!response.ok) {
      Swal.fire({
        title: 'Error!',
        text: 'Your email and password did not match.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }
  
    const json = await response.json();
  
    if (json.loginSuccess) {
      Swal.fire({
        title: 'Success!',
        text: 'Login successful',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          console.log('Logged in successfully', json);
          window.location.href = '/';
        }
      });
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Login failed. Please check your credentials.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };
  
  

  return (
    <div>
      <h1>Login</h1>
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

        <button type="submit" className="btn btn-primary">
          Login
        </button>

        {error.submit && <div className="error">{error.submit}</div>}
      </form>
      <ToastContainer />
    </div>
  );
};

export default SupplierLogin;
