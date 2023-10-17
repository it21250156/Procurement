import { useState } from 'react';
import { useSiteManagerContext } from '../hooks/useSiteManagersContext';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling
import Swal from 'sweetalert2';

const SiteManagerForm = () => {
  const { dispatch } = useSiteManagerContext();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [sitename, setSitename] = useState('');
  const [siteaddress, setSiteAddress] = useState('');
  const [mobileno, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (mobileno.length !== 10) {
      // Display a toast error message
      toast.error('Mobile number must contain exactly 10 digits.');
      return;
    }

    // Password validation: Requires at least one letter and one number
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!password.match(passwordRegex)) {
      // Display a toast error message for the password format
      toast.error(
        'Password must contain at least one letter and one number and be at least 8 characters long.'
      );
      return;
    }

    const siteManager = {
      name,
      username,
      sitename,
      siteaddress,
      mobileno,
      email,
      password,
    };

    const response = await fetch('/api/industry/sitemanagers', {
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
        text: 'Site Manager added successfully',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then((result) => {
        // After the user clicks "OK," navigate to the SiteManager page
        if (result.isConfirmed) {
          setName('');
          setUsername('');
          setSitename('');
          setSiteAddress('');
          setMobileNo('');
          setEmail('');
          setPassword('');
          setError(null);
          dispatch({ type: 'CREATE_SITEMANAGER', payload: json });
          console.log('new site manager added', json);
          // You should replace '/sitemanager' with the correct path to your SiteManager page
          window.location.href = '/sitemanagers';
        }
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div class="mb-3">
          <label for="nameInput" class="form-label">
            Site Manager Name
          </label>
          <input
            type="text"
            class="form-control"
            id="nameInput"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>

        <div class="mb-3">
          <label for="usernameInput" class="form-label">
            Username
          </label>
          <input
            type="text"
            class="form-control"
            id="usernameInput"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>

        <div class="mb-3">
          <label for="siteNameInput" class="form-label">
            Site Name
          </label>
          <input
            type="text"
            class="form-control"
            id="siteNameInput"
            onChange={(e) => setSitename(e.target.value)}
            value={sitename}
          />
        </div>

        <div class="mb-3">
          <label for="siteAddressTextarea" class="form-label">
            Site Address
          </label>
          <textarea
            class="form-control"
            id="siteAddressTextarea"
            rows="3"
            onChange={(e) => setSiteAddress(e.target.value)}
            value={siteaddress}
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

        <button type="submit" class="btn btn-primary btn-lg">
          Add Site Manager
        </button>

        {error && <div className="error">{error}</div>}
      </form>
      <ToastContainer />
    </div>
  );
};

export default SiteManagerForm;
