import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';

const Home = () => {
  return (
    <div>
      <NavBar />
      <Link to={'/supplierlogin'}>
        <Button>Supplier</Button>
      </Link>
    </div>
  );
};

export default Home;
