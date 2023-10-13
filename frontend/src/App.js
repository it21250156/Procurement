import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

//pages and components
import SiteManagers from './pages/SiteManagers';
import NavBar from './components/NavBar';
import SiteManagerAddPage from './pages/SiteManagerAddPage';
import Suppliers from './pages/Suppliers';
import { ToastContainer } from 'react-toastify';
import SupplierAddPage from './pages/SupplierAddPage';
import OrderRequestsPage from './pages/OrderRequestsPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="pages">
          <Routes>
            <Route path="/sitemanagers" element={<SiteManagers />} />
            <Route path="/suppliers" element={<Suppliers />}></Route>
            <Route
              path="/sitemanageraddpage"
              element={<SiteManagerAddPage />}
            />
            <Route path="/supplieraddpage" element={<SupplierAddPage />} />
            <Route path="/orderrequests" element={<OrderRequestsPage />} />
          </Routes>
        </div>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
