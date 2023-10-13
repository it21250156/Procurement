import { useEffect } from 'react';
import { useSiteManagerContext } from '../hooks/useSiteManagersContext';

//components
import SiteManagerDetails from '../components/SiteManagerDetails';
import PageHeading from '../components/PageHeading';
import { Link } from 'react-router-dom';

const SiteManagers = () => {
  const { siteManagers, dispatch } = useSiteManagerContext();

  useEffect(() => {
    const fetchSiteManagers = async () => {
      const response = await fetch('/api/industry/sitemanagers');
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_SITEMANAGER', payload: json });
      }
    };
    fetchSiteManagers();
  }, [dispatch]);

  const headingText = 'Site Managers';

  return (
    <div className="home">
      <div className="sitemanagers">
        <div class="container border border-success p-2 mb-2 border-opacity-25 rounded-2 mt-2 mb-2 shadow-sm ">
          <PageHeading text={headingText}></PageHeading>
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <Link to={'/sitemanageraddpage'}>
              <button type="button" class="btn btn-success btn-lg mb-2">
                Add a Site Manager
              </button>
            </Link>
          </div>
          {siteManagers &&
            siteManagers.map((siteManager) => (
              <SiteManagerDetails
                key={siteManager._id}
                siteManager={siteManager}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default SiteManagers;
