import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import CustomerList from './pages/Customer/CustomerList';
import CreateCustomer from './pages/Customer/CustomerCreate';

createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />

        <Route path="/customers" element={<CustomerList />} />
        <Route path="/create-customer" element={<CreateCustomer />} />
      </Routes>
    </BrowserRouter>
  </>
)
