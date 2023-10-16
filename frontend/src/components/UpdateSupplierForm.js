// UpdateSupplierForm.js
import React, { useState, useEffect } from 'react';
import { useSupplierContext } from '../hooks/useSuppliersContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const UpdateSupplierForm = ({ selectedSupplier }) => {
  const { dispatch } = useSupplierContext();

  const [companyname, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [mobileno, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Load the existing supplier data when a selectedSupplier is provided
    if (selectedSupplier) {
      setCompanyName(selectedSupplier.companyname);
      setAddress(selectedSupplier.address);
      setMobileNo(selectedSupplier.mobileno);
      setEmail(selectedSupplier.email);
      setPassword(selectedSupplier.password);
    }
  }, [selectedSupplier]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if selectedSupplier and its _id property are defined
    if (selectedSupplier && selectedSupplier._id) {
      const updatedSupplier = {
        companyname,
        address,
        mobileno,
        email,
        password,
      };

      const response = await fetch(
        `/api/industry/suppliers/${selectedSupplier._id}`,
        {
          method: 'PATCH',
          body: JSON.stringify(updatedSupplier),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const json = await response.json();

      if (!response.ok) {
        setError(json.error);
      } else {
        Swal.fire({
          title: 'Success!',
          text: 'Supplier updated successfully',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            setCompanyName('');
            setAddress('');
            setMobileNo('');
            setEmail('');
            setPassword('');
            setError(null);
            dispatch({ type: 'UPDATE_SUPPLIER', payload: json });
            console.log('Supplier updated', json);
            // You should replace '/suppliers' with the correct path to your Suppliers page
            window.location.href = '/suppliers';
          }
        });
      }
    } else {
      // Handle the case where selectedSupplier or selectedSupplier._id is undefined
      console.error('selectedSupplier is undefined or missing _id');
      // You can display an error message to the user or perform other error handling.
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

        <button type="submit" className="btn btn-primary">
          {selectedSupplier ? 'Update Supplier' : 'Add Supplier'}
        </button>

        {error && <div className="error">{error}</div>}
      </form>
      <ToastContainer />
    </div>
  );
};

export default UpdateSupplierForm;
