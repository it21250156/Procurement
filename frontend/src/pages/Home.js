import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <Link to={'/supplierlogin'}>
        <Button>Supplier</Button>
      </Link>
    </div>
  );
};

export default Home;
