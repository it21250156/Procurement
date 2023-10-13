import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SiteManagerContextProvider } from './context/SiteManagerContext';
import { SupplierContextProvider } from './context/SupplierContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SiteManagerContextProvider>
      <SupplierContextProvider>
        <App />
      </SupplierContextProvider>
    </SiteManagerContextProvider>
  </React.StrictMode>
);
