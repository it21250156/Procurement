import { Button } from 'react-bootstrap';
import { useSiteManagerContext } from '../hooks/useSiteManagersContext';

import Swal from 'sweetalert2';

const SiteManagerDetails = ({ siteManager }) => {
  const { dispatch } = useSiteManagerContext();

  const handleClick = async () => {
    Swal.fire({
      title: 'Delete Site Manager',
      text: 'Are you sure you want to delete this site manager?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        // User clicked "Delete," perform the deletion
        const response = await fetch(
          '/api/industry/sitemanagers/' + siteManager._id,
          {
            method: 'DELETE',
          }
        );
        // const json = await response.json();
        if (response.ok) {
          // If the deletion is successful, show a success notification
          Swal.fire('Deleted!', 'The sitemanager has been deleted.', 'success');
          dispatch({ type: 'DELETE_SITEMANAGER', payload: siteManager });
          window.location.href = '/sitemanagers';
        } else {
          // If there's an error with the deletion, show an error notification
          Swal.fire('Error', 'Could not delete the site manager.', 'error');
        }
      }
    });
  };

  return (
    <div className="sitemanager_details">
      <div class="card mb-3 ">
        <h5 class="card-header">{siteManager.name}</h5>
        <div class="card-body">
          <p class="card-text">
            <strong>Email : </strong>
            {siteManager.email}
          </p>
          <p class="card-text">
            <strong>Mobile No : </strong>
            {siteManager.mobileno}
          </p>
          <p class="card-text">
            <strong>Site : </strong>
            {siteManager.sitename}
          </p>

          <Button variant="outline-danger" onClick={handleClick}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SiteManagerDetails;
