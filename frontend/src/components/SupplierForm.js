import { useState } from 'react';
import { useSupplierContext } from '../hooks/useSuppliersContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const SupplierForm = () => {
  const { dispatch } = useSupplierContext();

  const [companyname, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [mobileno, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({
    companyname: '',
    address: '',
    mobileno: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Empty field validations
    const formErrors = {};
    if (!companyname) {
      formErrors.companyname = 'Company Name is required';
      toast.warn('Company Name is required');
    }
    if (!address) {
      formErrors.address = 'Company Address is required';
      toast.warn('Company Address is required');
    }
    if (!mobileno) {
      formErrors.mobileno = 'Mobile No is required';
      toast.warn('Mobile No is required');
    } else if (mobileno.length !== 10) {
      formErrors.mobileno = 'Mobile No must contain exactly 10 digits';
      toast.warn('Mobile No must contain exactly 10 digits');
    }
    if (!email) {
      formErrors.email = 'Email Address is required';
      toast.warn('Email Address is required');
    }
    if (!password) {
      formErrors.password = 'Password is required';
      toast.warn('Password is required');
    } else {
      // Password validation: Requires at least one letter and one number
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      if (!password.match(passwordRegex)) {
        formErrors.password =
          'Password must contain at least one letter and one number and be at least 8 characters long';
        toast.warn(
          'Password must contain at least one letter and one number and be at least 8 characters long'
        );
      }
    }

    setError(formErrors);

    if (Object.keys(formErrors).length > 0) {
      return;
    }

    // Clear the previous error state
    setError({});

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
      setError({ ...error, ...json.error });
    } else {
      // If the response is successful, display a SweetAlert2 success notification
      Swal.fire({
        title: 'Success!',
        text: 'Supplier added successfully',
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
          dispatch({ type: 'CREATE_SUPPLIER', payload: json });
          console.log('new supplier added', json);

          window.location.href = '/suppliers';
        }
      });
    }
  };

  return (
    <div>
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
        </div>

        <button type="submit" className="btn btn-primary btn-lg">
          Add Supplier
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SupplierForm;
