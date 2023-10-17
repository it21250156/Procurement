import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useSupplierContext } from '../hooks/useSuppliersContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import NavBar from '../components/NavBar';
import PageHeading from '../components/PageHeading';

const UpdateSupplier = () => {
  const { dispatch } = useSupplierContext();

  const [companyname, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [mobileno, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { sid } = useParams();

  useEffect(() => {
    // Load the existing supplier data when a selectedSupplier is provided
    const fetchSupplier = async () => {
      try {
        const response = await fetch(`/api/industry/suppliers/${sid}`);
        if (response.ok) {
          const supplierData = await response.json();
          const { companyname, address, mobileno, email, password } =
            supplierData;
          setCompanyName(companyname);
          setAddress(address);
          setMobileNo(mobileno);
          setEmail(email);
          setPassword(password);
        }
      } catch (error) {
        console.error('Error fetching supplier details', error);
      }
    };
    fetchSupplier();
  }, [sid]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!companyname) {
      toast.warn('Company Name is required');
      return;
    }

    if (!address) {
      toast.warn('Company Address is required');
      return;
    }

    if (!mobileno) {
      toast.warn('Mobile No is required');
      return;
    }

    if (!email) {
      toast.warn('Email Address is required');
      return;
    }

    const updatedSupplier = {
      companyname,
      address,
      mobileno,
      email,
      password,
    };

    const response = await fetch(`/api/industry/suppliers/${sid}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedSupplier),
      headers: {
        'Content-Type': 'application/json',
      },
    });

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
          setError(null);
          dispatch({ type: 'UPDATE_SUPPLIER', payload: json });
          console.log('Supplier updated', json);

          window.location.href = '/suppliers';
        }
      });
    }
  };

  const headingText = 'Update Supplier';

  return (
    <div>
      <NavBar />
      <div className="allProducts  container w-50 border border-success p-2 mb-2 border-opacity-25 rounded-2 mt-2 mb-2 shadow-sm">
        <PageHeading text={headingText}></PageHeading>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="companyNameInput" className="form-label">
              Company Name
            </label>
            <input
              type="text"
              className="form-control"
              id="companyNameInput"
              onChange={(e) => setCompanyName(e.target.value)}
              value={companyname}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="addressTextarea" className="form-label">
              Company Address
            </label>
            <textarea
              className="form-control"
              id="addressTextarea"
              rows="3"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            ></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="mobileNoInput" className="form-label">
              Mobile No
            </label>
            <input
              type="text"
              className="form-control"
              id="mobileNoInput"
              onChange={(e) => setMobileNo(e.target.value)}
              value={mobileno}
            />
          </div>

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
          </div>

          <button type="submit" className="btn btn-primary btn-lg">
            Update
          </button>

          {error && <div className="error">{error}</div>}
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default UpdateSupplier;
