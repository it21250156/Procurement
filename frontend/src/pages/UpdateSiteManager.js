import { useEffect, useState } from 'react';
import { useSiteManagerContext } from '../hooks/useSiteManagersContext';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import PageHeading from '../components/PageHeading';

const UpdateSiteManager = () => {
  const { dispatch } = useSiteManagerContext();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [sitename, setSitename] = useState('');
  const [siteaddress, setSiteAddress] = useState('');
  const [mobileno, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { smid } = useParams();

  useEffect(() => {
    const fetchSiteManager = async () => {
      try {
        const response = await fetch(`/api/industry/sitemanagers/${smid}`);
        if (response.ok) {
          const siteManagerData = await response.json();
          const {
            name,
            username,
            sitename,
            siteaddress,
            mobileno,
            email,
            password,
          } = siteManagerData;
          setName(name);
          setUsername(username);
          setSitename(sitename);
          setSiteAddress(siteaddress);
          setMobileNo(mobileno);
          setEmail(email);
          setPassword(password);
        }
      } catch (error) {
        console.error('Error fetching site manager details', error);
      }
    };
    fetchSiteManager();
  }, [smid]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedSiteManager = {
      name,
      username,
      sitename,
      siteaddress,
      mobileno,
      email,
      password,
    };

    const response = await fetch(`/api/industry/sitemanagers/${smid}`, {
      method: 'PATCH',
      body: JSON.stringify(updatedSiteManager),
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
        text: 'Site Manager updated successfully',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then((result) => {
        // After the user clicks "OK," navigate to the SiteManager page
        if (result.isConfirmed) {
          setError(null);
          dispatch({ type: 'UPDATE_SITEMANAGER', payload: json });
          console.log('site manager updated', json);
          // You should replace '/sitemanager' with the correct path to your SiteManager page
          window.location.href = '/sitemanagers';
        }
      });
    }
  };

  const headingText = 'Update Site Manager';

  return (
    <div>
      <NavBar />
      <div className="container w-50 border border-success p-2 mb-2 border-opacity-25 rounded-2 mt-2 mb-2 shadow-sm">
        <PageHeading text={headingText}></PageHeading>
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

          <button type="submit" class="btn btn-primary btn-lg">
            Update
          </button>

          {error && <div className="error">{error}</div>}
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default UpdateSiteManager;
