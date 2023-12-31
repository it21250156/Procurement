import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

//pages and components
import SiteManagers from './pages/SiteManagers';
import SiteManagerAddPage from './pages/SiteManagerAddPage';
import Suppliers from './pages/Suppliers';
import { ToastContainer } from 'react-toastify';
import SupplierAddPage from './pages/SupplierAddPage';
import OrderRequestsPage from './pages/OrderRequestsPage';
import SupplierLogin from './pages/SupplierLogin';
import AllProducts from './pages/AllProducts';
import SupProducts from './pages/SupProducts';
import AddProduct from './pages/AddProduct';
import UpdateProductForm from './components/UpdateProductForm';
import OrderApprovePage from './pages/OrderApprovePage';
import ConfirmedOrderPage from './pages/ConfirmedOrderPage';
import UpdateSupplier from './pages/UpdateSupplier';
import SupplierOrders from './pages/SupplierOrders';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import UpdateSiteManager from './pages/UpdateSiteManager';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/" element={<Home />} />
            <Route path="/sitemanagers" element={<SiteManagers />} />
            <Route path="/suppliers" element={<Suppliers />}></Route>
            <Route path="/supplierlogin" element={<SupplierLogin />} />
            <Route
              path="/sitemanageraddpage"
              element={<SiteManagerAddPage />}
            />
            <Route path="/supplieraddpage" element={<SupplierAddPage />} />
            <Route path="/orderrequests" element={<OrderRequestsPage />} />
            <Route path="/updatesupplier/:sid" element={<UpdateSupplier />} />
            <Route
              path="/updatesitemanager/:smid"
              element={<UpdateSiteManager />}
            />
            {/* Malika Routes */}
            <Route path="/allProducts" element={<AllProducts />} />
            <Route path="/supProducts" element={<SupProducts />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/updateproduct/:_id" element={<UpdateProductForm />} />
            <Route path="/supplierOrders" element={<SupplierOrders />} />
            <Route
              path="orderapprove/:orderId"
              element={<OrderApprovePage />}
            />
            {/* <Route path="/orderapprove/:orderId" element={<OrderApprovePage />} /> */}
            <Route
              path="/confirmedorderpage"
              element={<ConfirmedOrderPage />}
            />
            <Route path="/updatesupplier" element={<UpdateSupplier />} />
          </Routes>
        </div>
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
